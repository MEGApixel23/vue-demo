<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\ItemRequest;
use Illuminate\Routing\Controller;

class ItemController extends Controller
{
    public function index()
    {
        return Item::paginate();
    }

    public function store(ItemRequest $request)
    {
        return Item::create(['text' => $request->get('text')]);
    }

    public function destroy(Item $item)
    {
        return $item->delete() ? $item : response('Something went wrong');
    }
}
