function calculateIQR(dataSet){
    // Calculates the InterQuartile Range(IQR) of a standard javascript array.
    // Used to determine if something is an outlier of the setup
    // O(1) performance, safe to call frequently
    // first find the quartiles
    if(dataSet.length <= 1) return Infinity;
    let firstQuartile = 0;
    let thirdQuartile = 0;
	let dataLength = dataSet.length;
    if((dataSet.length/2) %2 !== 0){
		// If the two halves of the list are odd, then we don't need to average between two and can just pick
		firstQuartile = dataSet[Math.floor(dataLength/4)]
		thirdQuartile = dataSet[Math.floor(dataLength*3/4)]
    } else {
		// Otherwise, we have to do some averaging. We shouldn't need to be worried about indexOutOfBounds Errors here
		let firstQuartIndex = Math.floor(dataLength/4)
		let thirdQuartIndex = Math.floor(dataLength*3/4)
		firstQuartile = (dataSet[firstQuartIndex] + dataSet[firstQuartIndex-1])/2
		thirdQuartile = (dataSet[thirdQuartIndex] + dataSet[thirdQuartIndex-1])/2
    }
    return thirdQuartile - firstQuartile;
}
module.exports.calculateIQR = calculateIQR;
