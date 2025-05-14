<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(ProductResource::collection(Product::all()));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'cost_price' => 'nullable|numeric',
            'discount_price' => 'nullable|numeric',
            'discount' => 'boolean',
            'media' => 'nullable|array',
            'media.*' => 'file|image|max:5120',
        ]);

        $product = Product::create($validated);

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                $product
                    ->addMedia($file)
                    ->toMediaCollection('images');
            }
        }

        return response()->json(['message' => 'Created successfully!'], 201);
    }


    public function show(Product $product)
    {
        return response()->json(new ProductResource($product));
    }

    public function update(Request $request, Product $product)
    {

        $data = [];

        foreach (['title', 'short_description', 'description', 'price', 'cost_price', 'discount_price', 'discount'] as $field) {
            if ($request->has($field)) {
                $data[$field] = $request->input($field);
            }
        }

        $validated = validator($data, [
            'title' => 'nullable|string',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'cost_price' => 'nullable|numeric',
            'discount_price' => 'nullable|numeric',
            'discount' => 'nullable|boolean',
        ])->validate();

        \Log::debug('Product UPD:', [$request->all()]);

        if (empty($validated) && !$request->hasFile('media')) {
            return response()->json(['error' => 'No data to update'], 422);
        }

        $product->update($validated);

        if ($request->hasFile('media')) {
            $product->clearMediaCollection('images');

            foreach ($request->file('media') as $file) {
                $product
                    ->addMedia($file)
                    ->toMediaCollection('images');
            }
        }

        return response()->json(['message' => 'Updated successfully'], 200);
    }


    public function destroy(Request $request, Product $product)
    {
        $product->clearMediaCollection('images');
        $product->delete();
        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}