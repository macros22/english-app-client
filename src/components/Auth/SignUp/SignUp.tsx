import Link from 'next/link'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import styles from '../Auth.module.scss';
import { useAuthForm } from '../useAuthForm';

export const SignUp = () => {

  const {
    handleSubmit,
    email,
    handleEmail,
    name,
    handleName,
    password,
    handlePassword,
    errorMessage,
    successMessage,
    isLoadingPostForm,
  } = useAuthForm('signUp');

  return (
    <Grid textAlign='center' className={styles.wrapper} verticalAlign='middle'>
      <Grid.Column className={styles.form}>
        <Header as='h1' color='teal' textAlign='center'>
          Sign up
        </Header>
        <Form error success size='large' onSubmit={handleSubmit}>
          <Segment >
            <Form.Input
              value={email}
              onChange={handleEmail}
              size='huge' fluid icon='mail' iconPosition='left' placeholder='E-mail address' />
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
            {successMessage &&
              <Message
                success
                header={successMessage}
              />
            }
            <Button loading={isLoadingPostForm} color='teal' fluid size='huge'>
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Segment className={styles.additionalAction}>
          Or you can <Link href='/auth/sign-in' ><strong><a>Sign In</a></strong></Link>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
