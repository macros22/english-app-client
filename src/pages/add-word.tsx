import { Layout } from 'layouts';
import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { AddWord } from 'components';

const Addword = () => {
    return (
        <Layout>
            <Container>
                <Segment style={{maxWidth: '700px', margin: '0 auto'}}>
                    <AddWord />
                </Segment>
            </Container>
        </Layout>
    );
};

export default Addword;
