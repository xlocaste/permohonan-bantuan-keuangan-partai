<?php

namespace App\Http\Requests\DataPermohonan;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            "partai_id"=> ['required'],
            "user_id"=> ['required'],
            "tanggal_permohonan"=> ['required'],
            "surat_permohonan"=> ['required'],
            "surat_dpp"=> ['required'],
            "npwp"=> ['required'],
            "suket"=> ['required'],
            "rekening"=> ['required'],
            "rencana_penggunaan"=> ['required'],
            "irelasi"=> ['required'],
            "surat_pernyataan"=> ['required'],
            "status"=> ['required'],
            "keterangan"=> ['required'],
        ];
    }
}
