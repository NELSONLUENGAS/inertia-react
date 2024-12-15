<?php

namespace App\Http\Controllers;

use App\Services\SpotifyService;
use Illuminate\Http\Request;

class SpotifySyncController extends Controller
{
    private $spotifyService;

    public function __construct(SpotifyService $spotifyService)
    {
        $this->spotifyService = $spotifyService;
    }

    public function syncArtists()
    {
        $artists = $this->spotifyService->fetchData('browse/new-releases');

        foreach ($artists['albums']['items'] as $album) {
            // Artist::updateOrCreate(
            //     ['spotify_id' => $album['artists'][0]['id']],
            //     [
            //         'name' => $album['artists'][0]['name'],
            //         'image' => $album['images'][0]['url'] ?? null,
            //     ]
            // );
        }

        return response()->json(['message' => 'Artists synchronized successfully!']);
    }

    public function syncPlaylists()
    {
        $playlists = $this->spotifyService->fetchData('browse/featured-playlists');

        foreach ($playlists['playlists']['items'] as $playlist) {
            // Playlist::updateOrCreate(
            //     ['spotify_id' => $playlist['id']],
            //     [
            //         'name' => $playlist['name'],
            //         'description' => $playlist['description'],
            //         'image' => $playlist['images'][0]['url'] ?? null,
            //     ]
            // );
        }

        return response()->json(['message' => 'Playlists synchronized successfully!']);
    }
}
