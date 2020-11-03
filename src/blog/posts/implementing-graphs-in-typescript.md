---
title: "Implementing Graphs in Typescript"
date: "2020-10-22"
tags: ["project: we-cook-sometimes", "javascript", "typescript", "data structures", "algorithms", "graphs"]
---

What?
===

Recently, I've been working on
[we-cook-sometimes](https://github.com/andrew-chang-dewitt/we-cook-sometimes)
and came across a part of it that presented an interesting
opportunity. One of the main components of the application is a
section that asks a question, then displays a new question when
the user chooses one of the answers presented by the first
question. This continues until the user either navigates away from
the questions, or answers all of the questions available.
Additionally, what question is asked next is directly decided by
what questions came before it.

At first glance, this appeared as if it should be modeled as a
tree. However, in some cases, two questions could both lead to the
same next question&mdash;making the question series better suited to
being modeled as a directed acyclic graph. As always,
[there's an NPM package](https://www.npmjs.com/package/graph-data-structure)
for that
([actually, there's at least two](https://www.npmjs.com/package/graphlib)),
but why use an existing design when we can reinvent the wheel
instead?

Why?
===

In any serious project, I would of course use one of the existing
solutions. But in this case, I chose to implement a graph solution
myself because I've recently been studying more on graphs & other
data structures & recognized this as a great opportunity to take
a more in-depth look at graphs & related algorithms.

How?
===

To get started, I first needed to model a graph's nodes &
edges&mdash;luckily, that's easily done with what's called an
_adjacency list_. Essentially, this is a just a list of all the
nodes in a graph, each paired with a list of nodes that are
adjacent to that node. In Typescript, this is modeled as an
object with a key for each node & the value as an array of
adjacent nodes:

```typescript
interface AdjacencyList {
  [node: string]: Array<string>
}
```

For a graph of three nodes; `A`, `B`, & `C`; & three edges; `AB`, `AC`, & `BC`; an adjacency graph looks like this:

```typescript
const graph: AdjacencyList = {
  A: [B, C],
  B: [C],
  C: [],
}
```

While this alone is all that is needed to model the graph,
it's not of any use if there isn't any way of of interacting
with it. Specifically, I knew I needed to be able to do the
following with my graph:

1. Add nodes
2. Add edges
3. Traverse the graph
4. Detect cycles & enforce acyclicality when adding edges

Additionally, I wanted to be able to interact with this
graph structure as a self-contained object with methods
attached to the data structure. In some languages, I may
choose classes to implement this, but in Javascript (&
thus Typescript) I prefer to use functional inheritance.

Adding nodes
---

Adding nodes is incredibly simple to start. First though,
a way of creating the graph is needed:

```typescript
// Graph.spec.ts

import graph from './Graph'

describe('Graph', () => {
  it(
    'initializes with an empty adjacency list',
    () =>
  {
    expect(graph.create().adjacencyList)
      .to.be.empty
  })
})
```

Starting out, creating the graph is really simple&mdash;it's just
a function that returns an object with an `AdjacencyList` as
one of it's properties:

```typescript
// Graph.ts

interface AdjacencyList {
  [node: string]: Array<string>
}

interface Graph {
  readonly adjacencyList: AdjacencyList
}

const create = (): Graph => ({
  adjacencyList: {}
})

export {
  create,
}
```

With that in place, it's easier to use (& thus test) an
implementation of an `addNode()` method:

```typescript
// Graph.spec.ts

// ...

describe('addNode()', () => {
  let oldGraph = graph.create()
  let newGraph: Graph

  it('returns a graph with the new node added', () => {
    newGraph = oldGraph.addNode('A')

    expect(newGraph.adjacencyList['A']).to.exist
  })
})
```

```typescript
// Graph.ts

// highlight-start
interface State {
  readonly adjacencyList: AdjacencyList
}
// highlight-end

interface Graph {
  readonly adjacencyList: AdjacencyList
  // highlight-start
  addNode: (node: string): Graph
  //highlight-end
}

// highlight-start
const GraphBuilder = (state: State): Graph => ({
  adjacencyList: state.adjacencyList,
  addNode: (node) => {
    const newList = { ...state.adjacencyList  }
    newList[node] = []

    return GraphBuilder({
      adjacencyList: newList,
    })
  },
})
// highlight-end

const create = (): Graph =>
// highlight-start
  GraphBuilder({
    adjacencyList: {}
  })
// highlight-end

export {
  create,
}

```

As you can see, things got a little more complicated here,
so I'll walk through the two the major changes in a little
more detail.

First, `create` no longer simply returns an object.
Instead, it now returns a call to a builder function that
instead creates the object. This function, named
`GraphBuilder`, helps me do two things:

1. Create this Graph object in a way that allows for easy
  refactoring to use functional inheritance via
  `Object.assign`
2. Bundle state & methods together into one object,
  while allowing the methods to return a new instance of
  the object with it's changes applied (a favorite design
  pattern of mine that I picked up from Gary Bernhardt's
  [talk on boundaries](https://www.destroyallsoftware.com/talks/boundaries),
  where he calls it FauxO&mdash;in comparison to OOP).

Second, there's a new interface called State that overlaps
with Graph. This interface defines the internal state of
the Graph (right now just the adjacency list) used by
`GraphBuilder` and each of the methods of creates for Graph.

Adding edges
---

Additional methods follow the same pattern now, making
some things a little simpler going forward. A naive
implementation of `addEdge` may look like this:

```typescript
// Graph.spec.ts

// ...

describe('addEdge()', () => {
  let oldGraph = graph
    .create()
    .addNode('A')
    .addNode('B')
  let newGraph: Graph

  it(
    'returns a graph with the new node added',
    () =>
  {
    newGraph = oldGraph.addEdge('A',  'B')

    expect(newGraph.adjacencyList['A'])
      .to.deep.equal(['B'])
  })
})
```

```typescript
// Graph.ts

// ...

interface Graph {
  readonly adjacencyList: AdjacencyList
  addNode: (node: string): Graph
  // highlight-start
  addEdge: (from: string, to: string): Graph
  //highlight-end
}

const GraphBuilder = (state: State): Graph => ({
  adjacencyList: state.adjacencyList,

  addNode: (node) => {
    const newList = { ...state.adjacencyList  }
    newList[node] = []

    return GraphBuilder({
      adjacencyList: newList,
    })
  },

  // highlight-start
  addEdge: (from: string, to: string) => {
    const newEdges = state.adjacencyList[from]
    newEdges.push(to)

    state.adjacencyList[from] = newEdges

    return GraphBuilder({
      adjacencyList: state.adjacencyList
    })
  },
  // highlight-end

})

// ...
```

While the one test above would pass, but it hides a whole
host of problems just waiting to break things in unexpected
ways later. First, is the sneaky Siren-song of side-effects.
This Graph implementation is built using a pattern
designed to avoid side-effects, so one would hope that adding
an edge & assigning the resulting new graph to a new
variable would leave the original graph untouched. However,
the following new test show that this clearly isn't the case:

```typescript
// Graph.spec.ts

// ...

describe('addEdge()', () => {
  let oldGraph = graph
    .create()
    .addNode('A')
    .addNode('B')
  let newGraph: Graph

  it(
    'returns a graph with the new node added',
    () =>
  {
    newGraph = oldGraph.addEdge('A',  'B')

    expect(newGraph.adjacencyList['A'])
      .to.deep.equal(['B'])
  })

  // highlight-start
  it(
    'but leaves the original graph untouched',
    () =>
  {
    expect(oldGraph.adjacencyList['A'])
      .to.deep.equal([])
    // but this test would fail, because
    // oldGraph.adjacencyList['A'] actually
    // deep equals ['B']

  })
  // highlight-end
})
```

This happens because Javascript (& thus Typescript) passes
objects, like our State object, by reference. When `addEdge()`
modified the adjacency list in place on state using
`state.adjacencyList[from] = newEdges`, it modified the original
object referenced by `oldGraph` and referenced this same object
when creating `newGraph`.

Luckily, the fix is simple using the spread operator, `...`, (as
long as the consumer doesn't mind not supporting IE):

```typescript
// Graph.ts

// ...

const GraphBuilder = (state: State): Graph => ({
  adjacencyList: state.adjacencyList,

  // ...

  addEdge: (from: string, to: string) => {
    // highlight-start
    // spread the list of neighbors to shallow clone
    // it to avoid side affecting the given state
    const newEdges = [ ...state.adjacencyList[from]  ]
    // highlight-end
    newEdges.push(to)

    // highlight-start
    // spread the adjacency list to shallow clone it
    adjList = { ...state.adjacencyList  }
    // then replace the old list of neighbors with
    // the new one
    adjList[from] = newEdges
    // this avoids unnecessarily cloning all neighbors
    // lists when they aren't changing
    // highlight-end

    return GraphBuilder({
      // highlight-start
      adjacencyList: adjList
      // highlight-end
    })
  },
})

// ...
```

With this updated implementation of `addEdge()`, the tests will
now pass once again, but there's still a couple smaller problems.
Given a Graph with nodes A & B with no edges, adding edge CB will
throw the following error, `TypeError: Cannot read property 'push'
of undefined`. Worse yet, adding edge BC won't throw an error,
but will add C as an edge to node B, despite node C not yet
existing. While throwing an error here is good (as long as the
consumer knows to handle it), the error thrown by the first
problem is obtuse and could be made more clear (or exist at all
in the second problem). Throwing a specific error with a custom
message does a long way to help the end user know where they went
wrong. Adding this improvement requires two simple guards in the
method implementation.

```typescript
// Graph.spec.ts

// ...

describe('addEdge()', () => {
  let oldGraph = graph
    .create()
    .addNode('A')
    .addNode('B')
  let newGraph: Graph

  it(
    'returns a graph with the new node added',
    () =>
  {
    newGraph = oldGraph.addEdge('A',  'B')

    expect(newGraph.adjacencyList['A'])
      .to.deep.equal(['B'])
  })

  // highlight-start
  it(
    "it won't add an edge to a node that doesn't exist yet",
    () =>
  {
    expect() => newGraph.addEdge('C', 'A'))
      .to.throw(
        TypeError,
        /node.*c.*does not exist/i
      )
  })

  it(
    "it won't add an edge for an edge doesn't exist as a node",
    () =>
  {
    expect() => newGraph.addEdge('A', 'C'))
      .to.throw(
        TypeError,
        /node.*c.*does not exist/i
      )
  })
  // highlight-end
})
```

```typescript
// Graph.ts

// ...

const GraphBuilder = (state: State): Graph => ({
  adjacencyList: state.adjacencyList,

  // ...

  addEdge: (from: string, to: string) => {
    // highlight-start
    // spread the adjacency list to shallow clone it
    adjList = { ...state.adjacencyList  }

    // check if node already exists
    if (!adjList[node])
      throw TypeError(
        `A Node, \`${node}\`, does not exist yet; a Node must exist before an Edge can be added to it.`
      )

    // check if edge already exists
    if (!adjList[edge])
      throw TypeError(
        `A Node, \`${edge}\`, does not exist yet; an Edge must exist as a Node before it can be an Edge.`
      )
    // highlight-end

    // spread the list of neighbors to shallow clone
    // it to avoid side affecting the given state
    const newEdges = [ ...state.adjacencyList[from]  ]
    newEdges.push(to)

    // replace the old list of neighbors with the
    // new one
    adjList[from] = newEdges
    // this avoids unnecessarily cloning all neighbors
    // lists when they aren't changing

    return GraphBuilder({
      adjacencyList: adjList
    })
  },
})

// ...
```

Finally, there's one last problem to solve&mdash;this implementation
adds an edge even if it already exists. Given a Graph with nodes
`A` & `B` & edge `AB`, `aGraph.addEdge('B')` will still add edge `AB`
again, resulting in an adjacency list of `{ A: [ 'B', 'B'  ]  }`.

```typescript
// Graph.spec.ts

// ...

describe('addEdge()', () => {
  let oldGraph = graph
    .create()
    .addNode('A')
    .addNode('B')
  let newGraph: Graph

  it(
    'returns a graph with the new node added',
    () =>
  {
    newGraph = oldGraph.addEdge('A',  'B')

    expect(newGraph.adjacencyList['A'])
      .to.deep.equal(['B'])
  })

  // ...

  // highlight-start
  it(
    "but it won't add an edge again if it already exists",
    () =>
  {
    const newNewGraph = newGraph.addEdge('A', 'B')
    expect(newNewGraph.adjacencyList['A'])
      .to.not.deep.equal(['B', 'B'])
  })
  // highlight-end
})
```

```typescript
// Graph.ts

// ...

const GraphBuilder = (state: State): Graph => ({
  adjacencyList: state.adjacencyList,

  // ...

  addEdge: (from: string, to: string) => {
    // spread the adjacency list to shallow
    // clone it
    adjList = { ...state.adjacencyList  }

    // check if node already exists
    if (!adjList[node])
    throw TypeError(
      `A Node, \`${node}\`, does not exist yet; a Node must exist before an Edge can be added to it.`
    )

    // check if edge already exists
    if (!adjList[edge])
      throw TypeError(
        `A Node, \`${edge}\`, does not exist yet; an Edge must exist as a Node before it can be an Edge.`
    )

    // spread the list of neighbors to shallow clone
    // it to avoid side affecting the given state
    const newEdges = [ ...state.adjacencyList[from]  ]
    // highlight-start
    // check if the edge already exists before
    // adding it
    newEdges.includes(edge)
      ? null
      : newEdges.push(edge)
    // highlight-end

    // replace the old list of neighbors with the
    // new one
    adjList[from] = newEdges
    // this avoids unnecessarily cloning all neighbors
    // lists when they aren't changing

    return GraphBuilder({
      adjacencyList: adjList
    })
  },
})

// ...
```

Traverse the graph
---

The third core requirement of my graph implementation is to
be able to traverse it. This (like everything I've done here)
is very much a solved problem, but also one of the primary
motivations for me to practice graphs by building this
graph implementation. For my purposes, there wasn't much of
a difference between a breadth-first search (BFS) or a
depth-first one (DFS), but I knew I didn't have need for
two traversal algorithms. In the end I chose depth-first,
but it could have gone either way.

From reading _Hands-On Data Structures and Algorithms with
Python_ by Dr. Basant Agarwal & Benjamin Baka and
_Grokking Algorithms_ by Aditya Bhargava, I had a pretty
good set of references on how to do a simple traversal
using a DFS algorithm, so I thought I might make things
interesting by creating a `Graph.traverser()` method for
my Graph that behaves similarly to Javascript's
[iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)
(although it won't be a full implementation of it that
satisfies the entire protocol). To start, the first tests
& interface for `traverser()` to match that of`@@iterator`
look like this:

```typescript
// Graph.spec.ts

// ...

describe('traverser()', () => {
  const aGraph = graph.create()

  it('returns an Traverser made from the graph', () => {
    expect(aGraph.traverser()).to.exist
  })
})
```

```typescript
// Graph.ts

// ...

interface Graph {
  readonly adjacencyList: AdjacencyList
  addNode: (node: string): Graph
  addEdge: (from: string, to: string): Graph
  // highlight-start
  traverser: () => {
    next: () => string | null
  }
  //highlight-end
}

// ...
```

For now, the tests fail because in order for the DFS
algorithm to work, we need to know one more thing about
the graph as well. A traversal has to start somewhere,
which means we need to designate a root node. In order to
simplify graph creation `create()` is modified to take a
starting adjacency list & a root node as arguments. In the
event a graph is created as empty to start, then it'll
assume the first node added is the root.

```typescript
// Graph.ts

interface State {
  readonly adjacencyList: AdjacencyList
  // highlight-start
  readonly root: string
  // highlight-end
}

// ...

const GraphBuilder = (state: State): Graph => ({
  adjacencyList: state.adjacencyList,

  addNode: (node) => {
    // highlight-start
    // if this is the first node, make it the root
    if (Object.keys(state.adjacencyList).length === 0) state.root = node
    // highlight-end

    const newList = { ...state.adjacencyList  }
    newList[node] = []

    return GraphBuilder({
      adjacencyList: newList,
    })
  },
})

// highlight-start
const create = (
  adjacencyList: AdjacencyList = {},
  root: string | null = null
): Graph =>
  GraphBuilder({
    adjacencyList,
    root,
  })
// highlight-end
```

The rest can be computed at execution time. The algorithm
used requires tracking what nodes the traversal has visited
so far, as well as what nodes it is currently working with
(represented as a stack).

Also, now's a good time to test the `next()` method returned
by `traverser()`.

```typescript
// Graph.spec.ts

// ...

describe('traverser()', () => {
    // highlight-start
    cosnt adjList = {
      A: ['B', 'D'],
      B: [],
      C: ['B'],
      D: ['C'],
    }
    const aGraph = graph.create(adjList, 'A')
    // highlight-end
    // A -> B -> D -> C
  )

  // ...

  // highlight-start
  describe('next()', () => {
    let lastNode: string
    let traverser = aGraph.traverser()

    it('returns the next item in the traverser ', () => {
      lastNode = traverser.next()

      expect(lastNode).to.equal('A')
    })

    it('returns a new value each time', () => {
      expect(traverser.next()).to.not.equal(lastNode)
    })

    it('uses a depth-first traversal algorithm to determine order', () => {
      let traversed: Array<string | null> = []

      traverser = graph.create(adjList, 'A').traverser()

      traversed.push(traverser.next())
      traversed.push(traverser.next())
      traversed.push(traverser.next())
      traversed.push(traverser.next())

      expect(traversed).to.deep.equal(['A', 'B', 'D', 'C'])
    })

    it('returns null if there are no items left in the traverser', () => {
      expect(traverser.next()).to.be.null
    })
  })
  // highlight-end
})
```

```typescript
// Graph.ts

// ...

const GraphBuilder = (state: State): Graph => ({
  adjacencyList: state.adjacencyList,

  addNode: (node) => {
    // ...
  },

  addEdge: (from: string, to: string) => {
    // ...
  },

  // highlight-start
  traverser: () => {
    const visited: Array<string> = []
    const stack: Array<string> = []

    // start the traversal by examing the root node
    stack.push(state.root)

    return {
      next: () => {
        // do something to find the next node here...
      }
    }
  }
  // highlight-end
})

// ...
```

Finding the next node works by applying two tests &
stopping at the first one that passes:

1. Is there a current node? If not, then the traversal
  is complete.
2. Has the current node been visited? If not, then it's
  the next node to return.

Implementing them is fairly straightforward:

```typescript
// Graph.ts

// ...

const GraphBuilder = (state: State): Graph => ({
  // ...

  traverser: () => {
    const visited: Array<string> = []
    const stack: Array<string> = []

    stack.push(state.root)

    // highlight-start
    const recur = (): string | null => {
      const current = stack[stack.length - 1]

      if (!current) return null

      if (!visited.includes(current)) {
        visited.push(current)
        return current
      }

      // else find the next node, push it to the
      // stack, & recur...
    }
    // highlight-end

    return {
      next: () => recur()
    }
  }
})

// ...
```

Finding the next node when neither check is satisfied
is the trickiest part. First, `recur()` need to get
the list of neighbors for the current node, then it
needs to eliminate any neighbor that's already been
visited. If there's no remaining neighbors left, then
it pops the current node off the stack & recur
(making the next node on the stack the new current
node). Otherwise, it picks a node from the remaining
(un-visited) neighbors, push it to the stack (so that
it becomes the new current node), & recur.

```typescript
// Graph.ts

// ...

const GraphBuilder = (state: State): Graph => ({
  // ...

  traverser: () => {
    const visited: Array<string> = []
    const stack: Array<string> = []

    stack.push(state.root)

    const recur = (): string | null => {
      const current = stack[stack.length - 1]

      if (!current) return null

      if (!visited.includes(current)) {
        visited.push(current)
        return current
      }

      // highlight-start
      const neighbors = adjacencyList[current]

      let remaining = neighbors.reduce(
        (accumulator: string[], neighbor) => {
          if (!visited.includes(neighbor)) accumulator.push(neighbor)

          return accumulator
        },
        []
      )

      if (remaining.length <= 0) {
        stack.pop()

        return recur()
      }

      stack.push(remaining[0])

      return recur()
      // highlight-end
    }

    return {
      next: () => recur()
    }
  }
})

// ...
```

All-together, this is almost enough to pass the tests for `next()`,
but it still fails one ('uses a depth-first traversal algorithm to
determine order') at least some of the time. This happens because
the order of remaining is indeterminate. To fix this, remaining can
be sorted before getting the next node from it using
`Array.prototype.sort()`:

```typescript
// Graph.ts

// ...

const GraphBuilder = (state: State): Graph => ({
  // ...

  traverser: () => {
    // ...

    const recur = (): string | null => {
      // ...

      // highlight-start
      remaining = remaining.sort()
      // highlight-end
      stack.push(remaining[0])

      return recur()
    }

    return {
      next: () => recur()
    }
  }
})

// ...
```

By sorting remaining & always grabbing the first element
in the array, determining the next node becomes
predictable & the algorithm becomes testable. With graph
traversal solved, it's now possible to solve the final
requirement.

Detect cycles & enforce acyclicality
---

Fortunately, detecting a cycle is fairly straightforward:
given a current node during a traversal, if any one or more
of that current node's neighbors are already represented
in the stack, then that means there's a cycle. Because this
graph implementation is for directed, acyclical graphs, it
shouldn't allow cycles, & should throw an error when one is
detected.

```typescript
// Graph.spec.ts

import graph, { CycleError } from './Graph'

// ...

describe('traverser()', () => {
  // ...

  describe('next()', () => {
    // ...

    // highlight-start
    it(
      'throws an error if a cycle is detected at the current node',
      () =>
    {
      cosnt adjList = {
        A: ['B'],
        B: ['A'],
      }
      traverser = graph.create(adjList, 'A').traverser()
      // A -> B -> A -> B ...

      // stack => ['A']
      // current => ['A']
      // current's neighbors => ['B']
      traverser.next()
      // returns the root node, 'A'
      //
      // stack => ['A', 'B']
      // current => ['B']
      // current's neighbors => ['A']
      // B's neighbor, A, is already in the stack,
      // so it should throw an error
      expect(() => traverser.next()).to.throw(CycleError)
    })
    // highlight-end
  })
})
```

Getting it `next()` to throw the desired error is simple&mdash;
it only requires adding another check, this time after `neighbors`
is defined:

```typescript
// Graph.ts

// ...

const GraphBuilder = (state: State): Graph => ({
  // ...

  traverser: () => {
    const visited: Array<string> = []
    const stack: Array<string> = []

    stack.push(state.root)

    const recur = (): string | null => {
      const current = stack[stack.length - 1]

      if (!current) return null

      if (!visited.includes(current)) {
        visited.push(current)
        return current
      }

      const neighbors = adjacencyList[current]

      // highlight-start
      if (
        neighbors.some(
          (neighbor) => stack.includes(neighbor)
        )
      ) {
        throw new CycleError(
          'A cycle has been detected while traversing the graph'
        )
      }
      // highlight-end

      // ...
    }

    return {
      next: () => recur()
    }
  }
})

// ...
```

With cycle detection implemented, enforcing acyclicality is the
final problem to solve. This needs to happen when adding an edge
& should work something like this:

```typescript
// Graph.spec.ts

// ...

describe('addEdge()', () => {
  // ...

  // highlight-start
  it("won't add an edge that would create a cycle", () => {
    const aGraph = graph
      .create({
        A: ['B'],
        B: [],
      })

    expect(() => aGraph .addEdge('B', 'A'))
      .to.throw(CycleError)
  })
  // highlight-end
})
```

The simplest way to enforce acyclicality to `addEdge()` requires
building a new graph with the new edge, then traversing it in its
entirety.  Due to the cycle detection that was just added, this
traversal will throw a `CycleError` if the new edge creates a
cycle. This means the traversal just needs wrapped in a
`try...catch`, then if no error is thrown, the new graph can
be returned.

```typescript
// Graph.ts

// ...

const GraphBuilder = (state: State): Graph => ({
  // ...

  addEdge: (from: string, to: string) => {
    adjList = { ...state.adjacencyList  }

    if (!adjList[node])
    throw TypeError(
      `A Node, \`${node}\`, does not exist yet; a Node must exist before an Edge can be added to it.`
    )

    if (!adjList[edge])
      throw TypeError(
        `A Node, \`${edge}\`, does not exist yet; an Edge must exist as a Node before it can be an Edge.`
    )

    const newEdges = [ ...state.adjacencyList[from]  ]
    newEdges.includes(edge)
      ? null
      : newEdges.push(edge)

    adjList[from] = newEdges

    // highlight-start
    const newGraph = GraphBuilder({
      adjacencyList: adjList
    })

    try {
      const traverser = newGraph.traverser()
      let currentNode = traverser.next()

      while (currentNode !== null) {
        currentNode = traverser.next()
      }
    } catch (err) {
      if (err instanceof CycleError)
        throw new CycleError(
          `Can not add edge ${from}${to} because it would create a cycle`
        )
      else throw err
    }

    return newGraph
    // highlight-end
  },

  // ...
})

// ...
```

And with this last addition, that's all 4 of the main requirements.
In my actual implementation, I created a few more abstractions, but
everything here was the core idea. The full version is available
[on Github](https://github.com/andrew-chang-dewitt/we-cook-sometimes/blob/9bdfde290ba1b627b4456db8f2d8a72049159b50/src/utils/Graph.ts)
with the
[tests as well](https://github.com/andrew-chang-dewitt/we-cook-sometimes/blob/9bdfde290ba1b627b4456db8f2d8a72049159b50/src/utils/Graph.spec.ts).

Takeaways
===

At the end of the day, this implementation of a graph
structure was entirely unnecessary. There's more robust
and probably more performant solutions already out there
& it took a not insignificant amount of time on implementing
this that could have been spent writing other parts of the
application logic.

On the other hand, while this implementation missing
some basic functionality often used with graphs (.e.g
BFS, weighted edges, Dijkstra, Bellman-Ford, etc.), it
does exactly what I needed in my scenario & nothing more.
If in the future, I find myself trying to keep
dependencies down & I want a limited set of graph
features & related algorithms, I would actually consider
writing something like this again. In all scenarios, I'd
start with an existing library first, then re-implement
my own graph structure if & only if I thought it was
necessary.

Overall, this was a fun exercise that helped reinforce what
I've been learning from _Hands-On Data Structures and
Algorithms with Python_ by Dr. Basant Agarwal & Benjamin
Baka and _Grokking Algorithms_ by Aditya Bhargava.
