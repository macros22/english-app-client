import Link from 'next/link'
import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { signUp } from 'libs/auth.api';
import styles from '../Auth.module.scss';

export const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const [isLoadingPostForm, setIsLoadingPostForm] = React.useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoadingPostForm(true);
    if (email && name && password) {
      const { user, error } = await signUp({ email, name, password });
      if (!error && user) {

        console.log(user);
      }
      if (error) {
        setErrorMessage(error);
      }
    }
    setIsLoadingPostForm(false);
  };

  const handleEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    setErrorMessage('');
  };

  const handleName = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    setErrorMessage('');
  };

  const handlePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
    setErrorMessage('');
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column className={styles.form}>
        <Header as='h1' color='teal' textAlign='center'>
          Sign up
        </Header>
        <Form error size='large' onSubmit={handleSubmit}>
          <Segment >
            <Form.Input
              value={email}
              onChange={handleEmail}
              size='huge' fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              value={name}
              onChange={handleName}
              size='huge' fluid icon='user' iconPosition='left' placeholder='Your name' />
            <Form.Input
              value={password}
              onChange={handlePassword}
              size='huge'
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            {errorMessage &&
              <Message
                error
                header={errorMessage}

              />
            }
            <Button loading={isLoadingPostForm} color='teal' fluid size='huge'>
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Segment>
          Or you can <Link href='/auth/sign-in'><strong>Sign In</strong></Link>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
