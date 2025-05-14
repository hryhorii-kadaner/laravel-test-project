<?php

namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'price' => $this->price,
            'cost_price' => $this->cost_price,
            'discount_price' => $this->discount_price,
            'discount' => $this->discount,
            'images' => $this->getMedia('images')->map(function (Media $media) {
                return [
                    'original' => $media->getUrl(),
                    '100x100' => $media->getUrl('100x100'),
                    '300x300' => $media->getUrl('300x300'),
                    '600x600' => $media->getUrl('600x600'),
                ];
            }),
            'preview' => $this->getFirstMediaUrl('images', '100x100'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}