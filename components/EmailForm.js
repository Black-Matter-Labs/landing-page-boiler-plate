import React, { useState } from 'react'
import { Form, Input, Button, Modal, Checkbox } from 'antd';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBlhoKPib9dHVE9HjrzaC8oiNI4s4cDHH4",
    authDomain: "weedibles-400e3.firebaseapp.com",
    projectId: "weedibles-400e3",
    storageBucket: "weedibles-400e3.appspot.com",
    messagingSenderId: "974852536169",
    appId: "1:974852536169:web:b3a6e712434da9e3f9aff8",
    measurementId: "G-58R0LBD6WN"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app();
}
// firebase.analytics();

function validateEmail(email) {
    const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return re.test(String(email).toLowerCase());
}

const EmailForm = () => {
    const [modal, setModal] = useState(false)

    const [email, setEmail] = useState('');
    const emailHandler = ({ target: { value } }) => setEmail(value)
    
    const [error, setError] = useState('');

    const submitHandler = async () => {
        if (!email.trim()) {
            setError('Email is required.')
        } else if (!validateEmail(email.trim())) {
            setError('Please use a valid email.')
        } else {
            const emailRef = firebase.firestore().collection('validation-email-marketing').doc(email.trim())
            const doc = await emailRef.get()
            
            if (doc.exists) {
                setError('You already signed up using this email')
            } else {
                setError('')
                setModal(true)
                try {
                    firebase.firestore().collection('validation-email-marketing').doc(email.trim()).set({ signedUpDate: new Date().toLocaleString() })
                } catch (err) {
                    console.error(err)
                }
            }

        }
    }

    const questions = [
        'What is your biggest problem when making cannabis edibles?',
        'Why would it make a difference in your life to get an easier way to make edibles? (Details, please.)',
        'How difficult has it been for you to find a good answer for the above up to now?',
    ]

    const [answers, setAnswers] = useState(
        questions.reduce((acc, val) => {
            acc[val] = ''
            return acc;
        }, {}) // Reducer here intializes all state values with an empty string
    )

    const answerHandler = ({ target: { name, value, label } }) => setAnswers({
        ...answers,
        [name]: name === questions[2] ? label : value,
    })

    const [answerErrors, setAnswerErrors] = useState({});

    const submitQuestions = () => {
        const errors = {};
        let hasErrors = false;

        // Checks that all answer fields are filled out
        questions.forEach((question, index) => {
            errors[index] = Boolean(!answers[question]);
            if (!hasErrors) {
                hasErrors = Boolean(!answers[question]);
            }
        })
        setAnswerErrors(errors)

        if (!hasErrors) {
            try {
                firebase.firestore().collection('validation-questions').doc(email.trim()).set(answers)
            } catch (err) {
                console.error(err)
            }
            setEmail('')
            setModal(false)
        }
    }

    const onEnterHandler = ({ key }) => {
        if (key === 'Enter') submitHandler();
    }

    return (
        <>
            <Form>
              <div name="input" className="banner5-button-wrapper">
                <Form.Item validateStatus={error ? 'error' : ''} help={error} style={{ marginBottom: '20px' }}>
                  <Input placeholder="Type Email..." value={email} onChange={emailHandler} style={{ height: '50px' }} onKeyDown={onEnterHandler} />
                </Form.Item>
              </div>
            </Form>
            <div name="button" className="banner5-button-wrapper">
              <Button onClick={submitHandler} type="primary" shape="round" className="banner5-button kjhks75u76u-editor_css">REQUEST EARLY ACCESS</Button>
            </div>

            <Modal
                title="One Last Step before Early Access!"
                visible={Boolean(modal)}
                onOk={submitQuestions}
                okText="Receive Early Access"
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { backgroundColor: '#F3A964', borderColor: '#F3A964' } }}
                maskClosable={false}
                closable={false}
            >
                <p>
                    <b>Before receiving Early Access to Weedibles we ask that you share your thoughts with us.</b>
                </p>
                <br />
                
                <Form>
                    <p>{questions[0]}</p>
                    <Form.Item validateStatus={answerErrors[0] ? 'error' : ''} help={answerErrors[0] ? 'This is required.' : ''}>
                        <Input type="text" placeholder="Answer Here" name={questions[0]} onChange={answerHandler} />
                    </Form.Item>
                    <p>{questions[1]}</p>
                    <Form.Item validateStatus={answerErrors[1] ? 'error' : ''} help={answerErrors[1] ? 'This is required.' : ''}>
                        <Input.TextArea placeholder="Answer Here" name={questions[1]} onChange={answerHandler} />
                    </Form.Item>
                    <p>{questions[2]}</p>
                    <Form.Item validateStatus={answerErrors[2] ? 'error' : ''} help={answerErrors[2] ? 'This is required.' : ''}>
                        <Checkbox name={questions[2]} onChange={answerHandler} label="Not at all Difficult">Not at all Difficult</Checkbox>
                        <Checkbox name={questions[2]} onChange={answerHandler} label="Somewhat Difficult">Somewhat Difficult</Checkbox>
                        <Checkbox name={questions[2]} onChange={answerHandler} label="Very Difficult">Very Difficult</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EmailForm
