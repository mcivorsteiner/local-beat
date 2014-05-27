describe("Utilities", function() {

  it("returns distinct elements of the array", function() {
    var utilities = new Utilities

    var array = [1, 2, 3, 1]

    var distinctArray = utilities.uniq(array)

    expect(distinctArray).toEqual([1, 2, 3])
  })

})