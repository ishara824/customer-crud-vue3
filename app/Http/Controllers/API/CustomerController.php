<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::all();
        return response()->json($customers);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required',
            'email' => 'required|email',
            'birthday' => 'required',
            'mobile_number' => 'required'
        ]);

        Customer::create($request->only(['full_name', 'email', 'birthday', 'mobile_number']));

        return response()->json(['code' => 200, 'message' => 'Customer Created Successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $customer = Customer::find($id);
        return response()->json($customer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'full_name' => 'required',
            'email' => 'required|email',
            'birthday' => 'required',
            'mobile_number' => 'required'
        ]);

        $customer = Customer::findOrFail($id);

        if ($customer) {
            $customer->full_name = $request->full_name;
            $customer->email = $request->email;
            $customer->birthday = $request->birthday;
            $customer->mobile_number = $request->mobile_number;
            $customer->save();
        }

        return response()->json(['code' => 200, 'message' => 'Customer Updated Successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Customer::find($id)->delete();
        return response()->json(['code' => 200, 'message' => 'Customer Deleted Successfully.']);
    }
}
