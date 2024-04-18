<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Image::all();

        return response($data, 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Return a view to create a new image
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'img_name' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
            'img_status_id' => 'required',
            'img_user_id' => 'required',
            'img_emp_id' => 'required',
            'img_url' => 'required',
        ]);
    
        $image = $request->file('img_name');
    
        // Check if a file was actually uploaded
        if ($image) {
            $imageName = time() . '.' . $image->extension();
            $image->move(public_path('images'), $imageName);
    
            // Get the full URL of the uploaded image
            
            // Create a new instance of the Image model and set its attributes
            $imageModel = new Image();
            $imageModel->img_name = $imageName;
            $imageModel->img_status_id = $request->input('img_status_id');
            $imageModel->img_user_id = $request->input('img_user_id');
            $imageModel->img_emp_id = $request->input('img_emp_id');
            $imageModel->img_url = $request->input('img_url');
            $imageModel->save();
            
            
            // $image_url = Image::create([
                //     'img_url' => $url,
                // ]);
                $url = asset('images/' . $imageName);

            $image_data = Image::where('img_name', '=', $imageName)->first();

            return response()->json([
                'message' => 'Image uploaded successfully',
                 'image' => $url,
                 'image_details' => $image_data,
                //  'image_url' => $image_url,
                ]);
        } else {
            // Handle the case where no file was uploaded
            return response()->json(['message' => 'No image uploaded'], 400);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        // Display the details of the specified image
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        // Return a view to edit the specified image
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
    {
        // Implement validation for the incoming request data
      
        // Update the image record in the database
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        // Delete the specified image from storage and database
    }
}
