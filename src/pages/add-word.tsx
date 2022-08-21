import { Layout } from 'layouts';
import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { WordForm } from 'components';

const AddwordPage = () => {
    return (
        <Layout>
            <Container>
                
                    <WordForm mode="add" />
                {/* </Segment> */}
            </Container>
        </Layout>
    );
};

export default AddwordPage;
