<?php

use Illuminate\Foundation\Testing\DatabaseTransactions;

class JWTAuthTest extends TestCase
{
    use DatabaseTransactions;

    private $validEmail = 'g@g.g';
    private $validPassword = 'testtest23';

    public function test_login()
    {
        $response = $this->request('POST', '/api/login', [
            'email' => 'g@g.g',
            'password' => 'testtest23'
        ], false);

        return $response->assertResponseStatus(200)
            ->seeJsonStructure(['token']);
    }

    public function test_login_with_invalid_credentials()
    {
        $response = $this->request('POST', '/api/login', [
            'email' => 'invalid_email@gmail.com',
            'password' => 'some_invalid_password'
        ], false);

        return $response->assertResponseStatus(422)
            ->seeJsonContains(['wrong_credentials']);
    }

    public function test_registration()
    {
        $response = $this->request('POST', '/api/register', [
            'email' => 'new_user_email@mail.com',
            'password' => 'new_user_password'
        ], false);

        return $response->assertResponseStatus(200)
            ->seeJsonStructure(['token']);
    }

    public function test_registration_with_credentials_that_belongs_to_existing_user()
    {
        $response = $this->request('POST', '/api/register', [
            'email' => $this->validEmail,
            'password' => $this->validPassword
        ], false);

        return $response->assertResponseStatus(422)
            ->seeJsonContains([
                'email' => [
                    'The email has already been taken.'
                ]
            ]);
    }

    public function test_verify_valid_token()
    {
        $this->auth();
        $response = $this->request('GET', '/api/auth/verify');

        return $response->assertResponseStatus(200)
            ->seeJsonContains(['verified' => true]);
    }

    public function test_verify_invalid_token()
    {
        $this->auth();
        $response = $this->json('GET', '/api/auth/verify', [], [
            'Authorization' => "Bearer {$this->token}_bad_characters"
        ]);

        return $response->assertResponseStatus(400)
            ->seeJsonContains(['error' => 'token_invalid']);
    }
}
