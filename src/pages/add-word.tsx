import { Layout } from 'layouts';
import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { WordForm } from 'components';

const AddwordPage = () => {
    return (
        <Layout>
            <Container>
                <Segment style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <WordForm mode="add" />
                </Segment>
            </Container>
        </Layout>
    );
};

export default AddwordPage;
