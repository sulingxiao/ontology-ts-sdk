/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */

import { num2hexstring, StringReader, num2VarInt, ab2hexstring, hex2VarBytes } from '../utils'

export enum VmType {
    NativeVM = 0xFF,
    NEOVM    = 0x80,
    WASMVM   = 0x90
}

export class VmCode {
    vmType : VmType
    code : string

    serialize() {
        let result = ''
        result += num2hexstring(this.vmType)
        result += hex2VarBytes(this.code)
        return result
    }

    static deserialize(sr : StringReader) : any {
        let vmcode = new VmCode()
        let type = parseInt(sr.read(1), 16)
        let code = sr.readNextBytes()
        vmcode.vmType = type
        vmcode.code = code
        return vmcode
    }


}