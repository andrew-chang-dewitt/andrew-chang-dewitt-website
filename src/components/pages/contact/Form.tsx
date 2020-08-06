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
  submittedMessage: string
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

  // encode each data point as a URI string with a key
  const rawData = [
    encodeURIComponent('email=' + submittedEmail),
    encodeURIComponent('subject=' + submittedSubject),
    encodeURIComponent('message=' + submittedMessage),
  ]
  // then join with ampersands & replace spaces with +
  const encodedData = rawData.join('&').replace(/%20/g, '+')

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
        'Content-Type': 'application/x-www-form-urlencoded',
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
    setSubmitting(true)
    setMessageStatus({
      attempted: false,
    })

    // if honeypot has any text, silently fail to send the message
    if (whoops.length > 0) {
      setSubmitting(false)
      // set fields back to 0
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
      humanAnswer == '3' ||
      humanAnswer == 'three' ||
      humanAnswer == 'Three'
    ) {
      setSubmitError(false)
      sendEmail(senderEmail, subject, message).then((res) => {
        if (res.success) {
          setMessageStatus({
            attempted: true,
            success: true,
          })
          setSenderEmail('')
          setSubject('')
          setMessage('')
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
        <label htmlFor="senderEmail">Your email address:</label>
        <input
          type="email"
          id="senderEmail"
          autoComplete="email"
          required
          value={senderEmail}
          onChange={handleChange}
        />

        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={handleChange}
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          required
          onChange={handleChange}
        />

        <label htmlFor="humanAnswer">1 + 2 = ?</label>
        <input
          type="text"
          id="humanAnswer"
          value={humanAnswer}
          onChange={handleChange}
        />

        <span></span>
        <button type="submit">Send{submitting ? '...' : null}</button>
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
