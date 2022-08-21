import { Layout } from 'layouts';
import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { WordForm } from 'components';
import styles from 'styles/pages/AddWordPage.module.scss';

const AddwordPage = () => {
    return (
        <Layout>
            <Container>
            <Segment className={styles.form}>
                    <WordForm mode="add" />
                </Segment>
            </Container>
        </Layout>
    );
};

export default AddwordPage;
