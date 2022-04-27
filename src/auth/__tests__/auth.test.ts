import { generateJwt, verifyJwt } from ".."
import { InvalidAuthToken } from "../error"

it("creates and verifies jwt token", () => {
    const addr = "0x000"
    const authToken = generateJwt(addr)
    const data = verifyJwt(authToken)
    expect(data.address).toBe(addr)
})

it("throws an error for an invalid jwt token", () => {
    try {
        verifyJwt("abc123")
    } catch (err) {
        expect(err instanceof InvalidAuthToken).toBeTruthy()
    }

})