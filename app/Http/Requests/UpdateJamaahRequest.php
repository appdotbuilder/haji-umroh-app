<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJamaahRequest extends FormRequest
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
            'nama_lengkap' => 'required|string|max:255',
            'email' => 'required|email|unique:jamaah,email,' . $this->route('jamaah')->id,
            'no_telepon' => 'required|string|max:20',
            'alamat' => 'required|string',
            'no_paspor' => 'required|string|max:50|unique:jamaah,no_paspor,' . $this->route('jamaah')->id,
            'tanggal_lahir_paspor' => 'required|date|before:today',
            'tanggal_expired_paspor' => 'required|date|after:today',
            'paket_id' => 'required|exists:paket,id',
            'status_pembayaran' => 'required|in:belum_bayar,dp,lunas',
            'jumlah_bayar' => 'required|numeric|min:0',
            'catatan' => 'nullable|string',
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
            'nama_lengkap.required' => 'Nama lengkap harus diisi.',
            'nama_lengkap.max' => 'Nama lengkap maksimal 255 karakter.',
            'email.required' => 'Email harus diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah terdaftar oleh jamaah lain.',
            'no_telepon.required' => 'Nomor telepon harus diisi.',
            'alamat.required' => 'Alamat harus diisi.',
            'no_paspor.required' => 'Nomor paspor harus diisi.',
            'no_paspor.unique' => 'Nomor paspor sudah terdaftar oleh jamaah lain.',
            'tanggal_lahir_paspor.required' => 'Tanggal lahir paspor harus diisi.',
            'tanggal_lahir_paspor.date' => 'Format tanggal lahir paspor tidak valid.',
            'tanggal_lahir_paspor.before' => 'Tanggal lahir paspor harus sebelum hari ini.',
            'tanggal_expired_paspor.required' => 'Tanggal expired paspor harus diisi.',
            'tanggal_expired_paspor.date' => 'Format tanggal expired paspor tidak valid.',
            'tanggal_expired_paspor.after' => 'Tanggal expired paspor harus setelah hari ini.',
            'paket_id.required' => 'Paket harus dipilih.',
            'paket_id.exists' => 'Paket yang dipilih tidak valid.',
            'status_pembayaran.required' => 'Status pembayaran harus dipilih.',
            'status_pembayaran.in' => 'Status pembayaran tidak valid.',
            'jumlah_bayar.required' => 'Jumlah bayar harus diisi.',
            'jumlah_bayar.numeric' => 'Jumlah bayar harus berupa angka.',
            'jumlah_bayar.min' => 'Jumlah bayar tidak boleh kurang dari 0.',
        ];
    }
}