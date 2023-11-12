import React, { useState, useEffect, useLayoutEffect } from "react";
import Table from 'react-tailwind-table';



const ProductsTable = () => {

    var rows = [
        {
            id: "8278",
            name: "VIP",
            state: "YES",
            frequency: "One Time",
            price: "25",
            members: "424",
        },
        {
            id: "88",
            name: "MVA",
            state: "NO",
            frequency: "One Time",
            price: "50",
            members: "100",
        },
        {
            id: "825354",
            name: "F3F3",
            state: "YES",
            frequency: "One Time",
            price: "24",
            members: "12",
        },
    ]

    var columns = [
        {
         field: "id",
         use: "ID",
       },
       {
         field: "name",
         use: "NAME",
       },
       {
         field: "state",
         use: "ACTIVE",
       },
       {
         field: "frequency",
         use: "RECURRENCE",
       },
       {
         field: "price",
         use: "PRICE",
       },
       {
         field: "members",
         use: "CUSTOMERS",
         use_in_search:false
       }
   ]

    
    return (
        <>
            <div className="w-full">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-white rounded-tl-xl rounded-tr-xl">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Products</p>
                        <div>
                            <button className="transition-all duration-100 inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-orange-500 hover:bg-orange-600 focus:outline-none rounded">
                                <p className="text-sm font-medium leading-none text-white">New Product</p>
                            </button>
                        </div>
                    </div>
                </div>
                <Table
                striped = {false}
                bordered = {true}
                hovered = {true}
                show_search={true}
                columns={columns}
                rows={rows} 
                bulk_select_options={["Delete"]}
                styling={{
                    base_bg_color:"bg-orange-500",
                    base_text_color:"text-orange-500",
                    table_head:{
                        table_row:"bg-orange-100 my-4",
                        table_data:"text-sm text-slate-400"
                    }
                }}
                />
            </div>
        </>
    );
}
 
export default ProductsTable;