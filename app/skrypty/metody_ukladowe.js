pi = Math.PI

function round(x,precyzja)
{
	var tmp = 0
	for(var i=0;i<precyzja;i++)
	{
		if(tmp==0)
			tmp = 10
		else
			tmp = tmp*10
	}
	
	if(tmp==0)
		return Math.round(x)
	else
		return (Math.round(x*tmp))/tmp
}

function odleglosc_punktu_od_punktu(p1,p2)
{
    var suma=0
    for(var i=0;i<p1.length;i++)
        suma+=(p1[i]-p2[i])*(p1[i]-p2[i])
    return Math.sqrt(suma)
}

function radiany_na_stopnie(rad)
{
    return (360 * rad) / (2 * pi)
}

function stopnie_na_radiany(stopnie)
{
    return ((stopnie*2*pi)/360)
}