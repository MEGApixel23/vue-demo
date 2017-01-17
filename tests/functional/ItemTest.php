<?php

use App\Models\Item;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ItemTest extends TestCase
{
    use DatabaseTransactions;

    public function test_get_items_list()
    {
        $items = [
            factory(Item::class)->create()->toArray(),
            factory(Item::class)->create()->toArray(),
            factory(Item::class)->create()->toArray(),
            factory(Item::class)->create()->toArray(),
            factory(Item::class)->create()->toArray()
        ];

        return $this->request('GET', '/api/items', [], false)
            ->seeStatusCode(200)
            ->seeJsonStructure([
                'current_page', 'per_page', 'current_page',
                'last_page', 'next_page_url', 'prev_page_url',
                'from', 'to', 'data'
            ])
            ->seeJsonContains(['data' => $items]);
    }

    public function test_create_item_for_not_authenticated_user()
    {
        return $this->request('POST', '/api/items', [], false)
            ->seeStatusCode(400);
    }

    public function test_create_item_without_text()
    {
        $this->auth();

        return $this->request('POST', '/api/items')
            ->seeStatusCode(422)
            ->seeJsonStructure(['text']);
    }

    public function test_create_item()
    {
        $this->auth();

        return $this->request('POST', '/api/items', ['text' => str_random(25)])
            ->seeStatusCode(200)
            ->seeJsonStructure(['text']);
    }

    public function test_delete_item_for_not_authenticated_user()
    {
        $item = factory(Item::class)->create();

        return $this->request('DELETE', "/api/items/{$item->id}")
            ->seeStatusCode(400);
    }

    public function test_delete_not_existent_item()
    {
        $this->auth();

        return $this->request('DELETE', '/api/items/888888')
            ->seeStatusCode(404);
    }

    public function test_delete_item()
    {
        $this->auth();
        $item = factory(Item::class)->create();

        return $this->request('DELETE', "/api/items/{$item->id}")
            ->seeStatusCode(200)
            ->seeJson($item->toArray());
    }
}
