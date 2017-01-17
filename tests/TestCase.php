<?php

use App\User;

/**
 * Class TestCase
 *
 * @property string $baseUrl
 * @property string $token
 * @property User $user
 */
abstract class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    protected $baseUrl = 'http://localhost';
    protected $token;
    protected $user;

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }

    /**
     * Make request to API
     * use saved token for auth request
     *
     * @param $method string
     * @param $url string
     * @param array $params string
     * @param bool $auth
     * @return static
     */
    protected function request($method, $url, $params = [], $auth = true) {

        $headers = [];

        if ($this->token && $auth) {
            $headers = array_merge($headers, ['Authorization' => "Bearer {$this->token}"]);
        }

        $response = $this->json( $method, $url, $params, $headers );

        return $response;
    }

    /**
     * Authenticates a user and sets token for future requests.
     *
     * @return User
     */
    protected function auth()
    {
        if (empty($this->user)) {
            $password = str_random(10);
            $this->user = factory(User::class)->create([
                'password' => bcrypt($password)
            ]);

            $this->token = JWTAuth::attempt([
                'email' => $this->user->email,
                'password' => $password,
            ]);
        }

        return $this->user;
    }
}
