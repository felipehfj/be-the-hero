const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "PDAD2",
                email: "contato@email.com",
                whatsapp: "21992956072",
                city: "Saquarema",
                uf: "RJ"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should be able to authenticate a ONG', async () => {
        const response1 = await request(app)
            .post('/ongs')
            .send({
                name: "PDAD2",
                email: "contato@email.com",
                whatsapp: "21992956072",
                city: "Saquarema",
                uf: "RJ"
            });

        const ong_id = response1.body.id;

        const response2 = await request(app)
            .post('/sessions')
            .send({
                id: ong_id,                
            });

        expect(response2.body).toHaveProperty('name');        
    });
});