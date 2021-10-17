
const { expect } = require('chai')
const { ethers } = require('hardhat')
let Setter, Factory, setter, factory, num


describe('Setter contract test', () => {

    beforeEach(async () => {
        num = Math.floor(Math.random() * 100)
        Setter = await ethers.getContractFactory('Setter')
        setter = await Setter.deploy()
    })
    describe('Setter contract works', () => {
        it('should be equal', async () => {
            await setter.setNumber(num)
            expect(await setter.number()).to.equal(num)

        })
    })
})

describe('Factory contract test', () => {

    beforeEach(async () => {
        Setter = await ethers.getContractFactory('Setter')
        setter = await Setter.deploy()
        Factory = await ethers.getContractFactory('Factory')
        factory = await Factory.deploy(setter.address)

    })

    describe('Factory contract works', () => {
        it('should assign owner and create three clones', async () => {
            await factory.owner().then(res => {
                expect(res).to.not.equal('0x0000000000000000000000000000000000000000')
            })

            await factory.createNewSetter();
            await factory.createNewSetter();
            await factory.createNewSetter();
            const address1 = await factory.getSetter(0);
            const address2 = await factory.getSetter(1);
            const address3 = await factory.getSetter(2);

            const setter1 = await ethers.getContractAt("Setter", address1);
            setter1.setNumber(1);
            await setter1.number().then((res) => {
                console.log(parseInt(res))
            })

            const setter2 = await ethers.getContractAt("Setter", address2);
            setter2.setNumber(2);
            await setter2.number().then((res) => {
                console.log(parseInt(res))
            })

            const setter3 = await ethers.getContractAt("Setter", address3);
            setter3.setNumber(3);
            await setter3.number().then((res) => {
                console.log(parseInt(res))
            })
        })

    })
})
