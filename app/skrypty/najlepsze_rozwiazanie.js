function najlepsze_rozwiazanie(rozwiazania, odniesienie)
{
    var min = []
    var minSuma = -1
    for(var i=0;i<rozwiazania.length;i++)
	{
        var tmp = 0
        for(var j=0;j<rozwiazania[i].length;j++)
            tmp += Math.abs(odniesienie[j] - rozwiazania[i][j])
        if (minSuma > tmp || minSuma == -1)
		{
            minSuma = tmp
            min = rozwiazania[i]
		}
	}

    if(rozwiazania.length==0)
        console.error("Przysłano pustą tablicę.")
    else
        return min
}