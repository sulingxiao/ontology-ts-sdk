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

import AbiInfo from '../src/smartcontract/abi/abiInfo'
import AbiFunction from '../src/smartcontract/abi/abiFunction'
import {Parameter, ParameterType} from '../src/smartcontract/abi/parameter'

import json from '../src/smartcontract/data/idContract.abi'
import {Transaction} from '../src/transaction/transaction'

import { makeInvokeTransaction} from '../src/transaction/transactionBuilder'
import { Account } from '../src/account';
import { generatePrivateKeyStr, signatureData, getPublicKey } from '../src/core'
import {ab2hexstring, str2hexstr} from '../src/utils'

describe('test AbiInfo', () => {

    var a : AbiInfo,
        f : AbiFunction,
        tx : Transaction,
        serialized : string

    a = AbiInfo.parseJson(JSON.stringify(json))
    f = a.getFunction('RegIdWithPublicKey')
    test('test read json', () => {
        
        expect(f.parameters.length).toEqual(2)

        let ontidhex = str2hexstr('did:ont:TQLASLtT6pWbThcSCYU1biVqhMnzhTgLFq')
        let p1 = new Parameter('ontid', ParameterType.ByteArray,ontidhex)
        let p2 = new Parameter('publicKey', ParameterType.ByteArray, '039fbb47841f7338c0c654addd6225995642b5b6d492413563f7f8755ba83c0ecd')

        f.setParamsValue(p1,p2)

        console.log(f)

    })

    test('test make invokecode tx', () => {
        tx = makeInvokeTransaction(  f, a.getHash() )
        console.log(tx)
        
        serialized = tx.serialize()
        console.log('serialize: '+serialized)
        expect(serialized).toBeDefined()
    })

    test('test deserialize', () => {

        let t = Transaction.deserialize(serialized)
        console.log('deserialized: '+ t.toString())
        expect(t.txAttributes.length).toEqual(0)
    }) 
})
