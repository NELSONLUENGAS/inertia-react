<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChirpResource;
use App\Models\Chirp;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class ChirpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $chirps = Chirp::with('user:id,name')->latest()->get();

        return Inertia::render('Chirps/Index', [
            'chirps' => ChirpResource::collection($chirps)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Chirps/Create', [
            'chirps' => Chirp::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|max:255'
        ]);

        $request->user()->chirps()->create($validated);

        return redirect(route('chirps.index'))->with('status', [
            'message' => __('Chirp created👌!'),
            'type' => 'success'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chirp $chirp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chirp $chirp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chirp $chirp)
    {
        $this->authorize('update', $chirp);
        $validated = $request->validate([
            'content' => 'required|max:255'
        ]);

        $chirp->update($validated);

        return redirect(route('chirps.index'))->with('status', [
            'message' => __('Chirp updated👌!'),
            'type' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chirp $chirp)
    {
        $this->authorize('delete', $chirp);
        $chirp->deleteOrFail();

        return back()->with('status', [
            'message' => __('Chirp Deleted👌!'),
            'type' => 'success'
        ]);
    }
}
