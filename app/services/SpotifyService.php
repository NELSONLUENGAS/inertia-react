<?php

namespace App\Services;

use GuzzleHttp\Client;

class SpotifyService
{
    private $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => env('SPOTIFY_API_URL'),
        ]);
    }

    private function getAccessToken()
    {
        $SPOTIFY_CLIENT_ID = env('SPOTIFY_CLIENT_ID');
        $SPOTIFY_CLIENT_SECRET = env('SPOTIFY_CLIENT_SECRET');

        $basic_token = base64_encode("$SPOTIFY_CLIENT_ID:$SPOTIFY_CLIENT_SECRET");

        $response = $this->client->post('https://accounts.spotify.com/api/token', [
            'headers' => [
                'Authorization' => "Basic {$basic_token}",
            ],
            'form_params' => [
                'grant_type' => 'client_credentials',
            ],
        ]);

        $body = json_decode($response->getBody()->getContents(), true);

        return $body['access_token'];
    }

    public function fetchData($endpoint)
    {
        $accessToken = $this->getAccessToken();

        $response = $this->client->get($endpoint, [
            'headers' => [
                'Authorization' => "Bearer $accessToken",
            ],
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }
}
