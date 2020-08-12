import React from 'react'

import styles from './Form.module.sass'

interface SendEmailResult {
  success: boolean
  data?: any
  error?: any
}

export const sendEmail = (
  submittedEmail: string,
  submittedSubject: string,
  submittedMessage: string,
  submittedName: string
): Promise<SendEmailResult> => {
  // guard against empty email & message, subject is allowed to be empty
  if (submittedEmail === '')
    return Promise.resolve().then(() => ({
      success: false,
      error: 'Email cannot be empty',
    }))
  if (submittedMessage === '')
    return Promise.resolve().then(() => ({
      success: false,
      error: 'Message cannot be empty',
    }))

  // encode each data point as a key-value pair
  const rawData = {
    email: submittedEmail,
    subject: `New message received via website: ${submittedSubject}`,
    message: `
Message from ${submittedName}, reply to ${submittedEmail}):

===================================================================

${submittedMessage}
`,
  }
  // then encode the object as JSON
  const encodedData = JSON.stringify(rawData)

  const parseResponse = (response: Response): SendEmailResult => {
    if (typeof response.ok === 'undefined')
      throw Error(`Property \`ok\` does not exist on the response ${response}`)

    return response.ok
      ? {
          success: response.ok,
          data: response,
        }
      : {
          success: response.ok,
          error: response.status + ': ' + response.statusText,
        }
  }

  // use window.fetch to allow tests to mock fetch
  return window
    .fetch('/reach-out', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: encodedData,
    })
    .then((response) => {
      return parseResponse(response)
    })
    .catch((error) => {
      return { success: false, error: error }
    })
}

export const Form = () => {
  interface MessageStatus {
    attempted: boolean
    success?: boolean
  }

  const [senderName, setSenderName] = React.useState('')
  const [senderEmail, setSenderEmail] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [whoops, setWhoops] = React.useState('') // honeypot field
  const [humanAnswer, setHumanAnswer] = React.useState('') // bot test field

  const [submitting, setSubmitting] = React.useState(false)
  const [messageStatus, setMessageStatus] = React.useState<MessageStatus>({
    attempted: false,
  })
  const [submitError, setSubmitError] = React.useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.target.id) {
      case 'senderName': {
        setSenderName(e.target.value)
        break
      }
      case 'senderEmail': {
        setSenderEmail(e.target.value)
        break
      }
      case 'subject': {
        setSubject(e.target.value)
        break
      }
      case 'message': {
        setMessage(e.target.value)
        break
      }
      case 'humanAnswer': {
        setHumanAnswer(e.target.value)
        break
      }
      case 'whoops': {
        setWhoops(e.target.value)
        break
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const humanAnswerTrimmed = humanAnswer.trim()

    setSubmitting(true)
    setMessageStatus({
      attempted: false,
    })

    // if honeypot has any text, silently fail to send the message
    if (whoops.length > 0) {
      setSubmitting(false)
      // set fields back to 0
      setSenderName('')
      setSenderEmail('')
      setSubject('')
      setMessage('')
      setHumanAnswer('')
      // and pretend the message sent
      setMessageStatus({
        attempted: true,
        success: true,
      })
    }
    // if answers indicate human, send email
    else if (
      humanAnswerTrimmed == '3' ||
      humanAnswerTrimmed == 'three' ||
      humanAnswerTrimmed == 'Three'
    ) {
      setSubmitError(false)
      sendEmail(
        senderEmail.trim(),
        subject.trim(),
        message.trim(),
        senderName.trim()
      ).then((res) => {
        if (res.success) {
          setMessageStatus({
            attempted: true,
            success: true,
          })
          setSenderName('')
          setSenderEmail('')
          setSubject('')
          setMessage('')
          setHumanAnswer('')
        } else {
          setMessageStatus({
            attempted: true,
            success: false,
          })
        }
        setSubmitting(false)
      })
    }
    // if incorrect answer to 1 + 2 = ?, fail to send
    else {
      setSubmitError(true)
      setSubmitting(false)
    }

    e.preventDefault()
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.name}>
          <label htmlFor="senderName">Who are you?</label>
          <input
            type="text"
            id="senderName"
            value={senderName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.email}>
          <label htmlFor="senderEmail">What's your email?</label>
          <input
            type="email"
            id="senderEmail"
            autoComplete="email"
            required
            value={senderEmail}
            onChange={handleChange}
          />
        </div>

        <div className={styles.subject}>
          <label htmlFor="subject">What do you want to talk about?</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={handleChange}
          />
        </div>

        <div className={styles.message}>
          <label htmlFor="message">Tell me more:</label>
          <textarea
            id="message"
            value={message}
            required
            onChange={handleChange}
          />
        </div>

        <div className={styles.captcha}>
          <label htmlFor="humanAnswer">1 + 2 = ?</label>
          <input
            type="text"
            id="humanAnswer"
            value={humanAnswer}
            onChange={handleChange}
          />
        </div>

        <div className={styles.submit}>
          <button type="submit">Send{submitting ? '...' : null}</button>
        </div>

        {/*Honeypot field follows: */}
        <input
          className={styles.hidden + ' hidden'}
          type="text"
          id="whoops"
          data-testid="honeypot"
          value={whoops}
          onChange={handleChange}
        />
      </form>

      {submitError ? (
        <div role="alert">
          Are you sure you're human? Check your answer & try again
        </div>
      ) : null}

      {messageStatus.attempted ? (
        <div role="alert">
          {messageStatus.success
            ? `Thanks for reaching out! A copy of your message has been sent to ${senderEmail}.`
            : 'There was an error sending your message, please try again.'}
        </div>
      ) : null}
    </div>
  )
}
