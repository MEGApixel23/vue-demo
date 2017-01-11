<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Routing\Controller;

class ItemController extends Controller
{
    public function index()
    {
        return Item::paginate();
    }
}
