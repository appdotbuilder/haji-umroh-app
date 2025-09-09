<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_paket' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'tanggal_keberangkatan' => 'required|date|after:today',
            'durasi' => 'required|integer|min:1|max:365',
            'fasilitas' => 'required|string',
            'kapasitas_jamaah' => 'required|integer|min:1|max:1000',
            'jenis' => 'required|in:haji,umroh',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nama_paket.required' => 'Nama paket harus diisi.',
            'nama_paket.max' => 'Nama paket maksimal 255 karakter.',
            'harga.required' => 'Harga paket harus diisi.',
            'harga.numeric' => 'Harga harus berupa angka.',
            'harga.min' => 'Harga tidak boleh kurang dari 0.',
            'tanggal_keberangkatan.required' => 'Tanggal keberangkatan harus diisi.',
            'tanggal_keberangkatan.date' => 'Format tanggal keberangkatan tidak valid.',
            'tanggal_keberangkatan.after' => 'Tanggal keberangkatan harus setelah hari ini.',
            'durasi.required' => 'Durasi paket harus diisi.',
            'durasi.integer' => 'Durasi harus berupa angka bulat.',
            'durasi.min' => 'Durasi minimal 1 hari.',
            'durasi.max' => 'Durasi maksimal 365 hari.',
            'fasilitas.required' => 'Fasilitas paket harus diisi.',
            'kapasitas_jamaah.required' => 'Kapasitas jamaah harus diisi.',
            'kapasitas_jamaah.integer' => 'Kapasitas jamaah harus berupa angka bulat.',
            'kapasitas_jamaah.min' => 'Kapasitas jamaah minimal 1 orang.',
            'kapasitas_jamaah.max' => 'Kapasitas jamaah maksimal 1000 orang.',
            'jenis.required' => 'Jenis paket harus dipilih.',
            'jenis.in' => 'Jenis paket harus haji atau umroh.',
        ];
    }
}