<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductsController extends Controller
{
    public function addProduct(Request $request) {
        $product = Product::where('descriptions', $request->descriptions)->first();
        if ($product) {
            return response()->json(['message' => 'Product Description is already exists!'],404);
        }

        $category = $request->category;
        $descriptions = $request->descriptions;
        $qty = $request->qty;
        $unit = $request->unit;
        $costprice = $request->costprice;
        $sellprice = $request->sellprice;
        $saleprice = $request->saleprice;
        $productpicture = $request->productpicture;
        $alertstocks = $request->alertstocks;
        $criticalstocks = $request->criticalstocks;
        Product::create([
            'category' => $category,
            'descriptions' => $descriptions,
            'qty' => $qty,
            'unit' => $unit,
            'costprice' => $costprice,
            'sellprice' => $sellprice,
            'salesprice' => $saleprice,
            'productpicture' => $productpicture,
            'alertstocks' => $alertstocks,
            'criticalstocks' => $criticalstocks
        ]);
        return response()->json(['message' => 'New Product Created Successfully.'],201);
    }

    public function listProducts(Request $request, int $page) 
    {
        $perPage = 5;
        $skip = ($page - 1) * $perPage;
        try {
            $products = Product::skip($skip)->take($perPage)->get();
            $totalrecords = Product::count(); 
            $totpage = ceil($totalrecords / $perPage);


            if ($products->count() == 0) {
                return response()->json(['message' => 'Products is empty.'],404);
            }
            return response()->json(['message' => 'Product Retrieved Successfully.', 'totalrecords' => $totalrecords, 'page' => $page,'totpage'=> $totpage, 'products' => $products],200);
        } catch(\Exceptions $e) {
            return response()->json(['message' => $e->getMessage()],500);
        }
    }

    public function productSearch(string $key) {
        try {
            $products = Product::where('descriptions', 'LIKE', '%' . $key . '%')->get();
            if ($products->count() == 0) {
                return response()->json(['message' => 'Product not found.'],404);
            }
            return response()->json(['message' => 'Searched found..', 'products' => $products],200);
        } catch(\Exceptions $e) {
            return response()->json(['message' => $e->getMessage()],500);
        }

    }
}
