function rysuj_wykres(divName, x,y,z)
{
	var color = ["green","purple","red"]
	
	var ramieX = [0,0,x[1][0],x[0][0]]
	var ramieY = [0,0,y[1][0],y[0][0]]
	var ramieZ = [0,350,z[1][0],z[0][0]]
	
	var ramie = {
		type: 'scatter3d',
		mode: 'lines+markers',
		name: 'Początkowe położenie ramienia',
		x: ramieX,
		y: ramieY,
		z: ramieZ,
		line: {
		width: 6,
		color: color[2]},
		marker: {
		size: 3.5,
		color: color[2]}
	}
	
	var dane=[ramie]
	
	for(var i=0;i<x.length;i++)
	{
		var trace = 
		{
			type: 'scatter3d',
			mode: 'lines+markers',
			name: 'Pozycja przegubu '+(3-i)+' w czasie',
			x: x[i],
			y: y[i],
			z: z[i],
			line: {
			width: 6,
			color: color[i]},
			marker: {
			size: 3.5,
			color: color[i]}
		}
		
		dane.push(trace)
	}
	

	
	var ramieX = [0,0,x[1][x[1].length-1],x[0][x[0].length-1]]
	var ramieY = [0,0,y[1][y[1].length-1],y[0][y[0].length-1]]
	var ramieZ = [0,350,z[1][z[1].length-1],z[0][z[0].length-1]]
	
	var ramie = {
		type: 'scatter3d',
		mode: 'lines+markers',
		name: 'Końcowe położenie ramienia',
		x: ramieX,
		y: ramieY,
		z: ramieZ,
		line: {
		width: 6,
		color: "blue"},
		marker: {
		size: 3.5,
		color: "blue"}
	}
	
	dane.push(ramie)
	
	
	if(false)
	{
		for(var j=0;j<x[0].length;j++)
		{
			var punktyX = [0,0]
			var punktyY = [0,0]
			var punktyZ = [0,350]
			
			punktyX.push(x[1][j])
			punktyY.push(y[1][j])
			punktyZ.push(z[1][j])
			
			punktyX.push(x[0][j])
			punktyY.push(y[0][j])
			punktyZ.push(z[0][j])
			
			var trace = 
			{
				type: 'scatter3d',
				mode: 'lines',
				name: 'trace '+(j+1),
				x: punktyX,
				y: punktyY,
				z: punktyZ,
				line: {
				width: 6,
				color: 'blue'}
			}
	
			dane.push(trace)
		}
	}
	
	var layout = 
	{
	   xaxis: {range: [-456, 456], autorange: false},
		yaxis: {range: [-456, 456], autorange: false},
		zaxis: {range: [0, 790], autorange: false}
	};
	
	Plotly.newPlot(divName, dane); 
	
	// Plotly.newPlot(divName, [{
	  // type: 'scatter3d',
	  // mode: 'lines+markers',
	  // x: x,
	  // y: y,
	  // z: z,
	  // width: 500,
	  // height: 500,
	  // line: {
		// width: 6},
	  // marker: {
		// size: 3.5,
	  // }},                  
	// ]);
}