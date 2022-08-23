import { Layout } from 'layouts';
import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { WordForm } from 'components';
import styles from 'styles/pages/AddWordPage.module.scss';
import { Card } from 'components/Card/Card';

const AddwordPage = () => {
    return (
        <Layout >
            {/* <Container> */}
                <Card className={styles.form}>
                    <WordForm mode="add" />
                </Card>
            {/* </Container> */}
        </Layout>
    );
};

export default AddwordPage;
