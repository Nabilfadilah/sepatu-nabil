import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import Form from './Form';
import { Provider } from 'react-redux';
import store from '../../config/redux/store1';
import { BrowserRouter as Router } from 'react-router-dom';

describe("Form", () => {

    // buat mengecek inputan di dalam input name
    test("should render product name input and display entered text", () => {
        render(
        <Router>
            <Provider store={store}>
            <Form />
            </Provider>
        </Router>
        );
        const productNameInput = screen.getByTestId("productNameTest");
        const productName = "Product Name";
        
        fireEvent.change(productNameInput, { target: { value: productName } });
        expect(screen.getByTestId("productNameTest").value).toBe(productName);
        const productNameDisplay = screen.getByTestId("productNameTest");
        expect(productNameDisplay).toBeInTheDocument();
    })

    // untuk mengecek value catergory
    test("should render form and display selected option", () => {
        render(
        <Router>
            <Provider store={store}>
            <Form />
            </Provider>
        </Router>
        );
        const categorySelect = screen.getByTestId("productCategoryTest");
        const categoryOption = "Sepatu";
        fireEvent.change(categorySelect, { target: { value: categoryOption } });
        expect(categorySelect.value).toBe(categoryOption);
        const categoryDisplay = screen.getByText(categoryOption);
        expect(categoryDisplay).toBeInTheDocument();
    });
    });

    // untuk mengecek error ketika product name kosong
    test("should show error message when Product Name is empty", async () => {
    render(
        <Router>
        <Provider store={store}>
            <Form />
        </Provider>
        </Router>
    );
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
        expect(screen.getByText("Product Name wajib diisi")).toBeInTheDocument();
    });
    });

    // untuk mengecek carakter
    test("should show error message when Product Name contains invalid characters", async () => {
    render(
        <Router>
        <Provider store={store}>
            <Form />
        </Provider>
        </Router>
    );
    const productNameInput = screen.getByTestId("productNameTest");
    fireEvent.change(productNameInput, { target: { value: `~!@#$%^&*` } });
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
        expect(
        screen.getByText("Name must not contain symbols")
        ).toBeInTheDocument();
    });
    });

    // unutk mengecek maksimal karater
    test("Maksimal 25 karakter", async () => {
    render(
        <Router>
        <Provider store={store}>
            <Form />
        </Provider>
        </Router>
    );
    const productNameInput = screen.getByTestId("productNameTest");
    fireEvent.change(productNameInput, { target: { value: "A".repeat(26) } });
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
        expect(
        screen.getByText("Maksimal 25 karakter")
        ).toBeInTheDocument();
    });
    });

    // untuk mengecek semua message inputan 
    test("should show error messages when all form fields are empty", async () => {
    render(
        <Router>
        <Provider store={store}>
            <Form />
        </Provider>
        </Router>
    );
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
        expect(screen.getByText("Product Name wajib diisi")).toBeInTheDocument();
        expect(
        screen.getByText("Product Category wajib diisi")
        ).toBeInTheDocument();
        expect(
        screen.getByText("Product Image wajib diisi")
        ).toBeInTheDocument();
        expect(
        screen.getByText("Product Freshness wajib diisi")
        ).toBeInTheDocument();
        expect(screen.getByText("Product Price wajib diisi")).toBeInTheDocument();
    });
});