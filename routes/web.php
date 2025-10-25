<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Contorllers\AngularController;
// Route::get('/', function () {
//     return view('welcome');
// });

Route::view('/{any}', 'index')->where('any', '^(?!api).*$');
// Route::get('{path?}', function() {
//     return view('angular');
// })->where('path', '.*');