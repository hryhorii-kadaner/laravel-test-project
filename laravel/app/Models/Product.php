<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements HasMedia
{
    use SoftDeletes;
    use InteractsWithMedia;

    protected $guarded = [];

    protected $fillable = [
        'title',
        'short_description',
        'description',
        'price',
        'cost_price',
        'discount_price',
        'discount'
    ];

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('100x100')
            ->fit(Fit::Contain, 100, 100)
            ->performOnCollections('images');

        $this->addMediaConversion('300x300')
            ->fit(Fit::Contain, 300, 300)
            ->performOnCollections('images');

        $this->addMediaConversion('600x600')
            ->fit(Fit::Contain, 600, 600)
            ->performOnCollections('images');
    }
}