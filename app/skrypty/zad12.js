function pokaz_wykres12()
{
	var x = [[],[]]
	var y = [[],[]]
	var z = [[],[]]
	
	var lista = pobierz_liste()
	
	if(lista!=null)
	{
		for(var i=0;i<lista.length;i++)
		{
			var punkt = kinematyka_prosta_h30(lista[i][1],lista[i][2],lista[i][3])
			x[0].push(punkt[0])
			y[0].push(punkt[1])
			z[0].push(punkt[2])
			var punkt = kinematyka_prosta_h20(lista[i][1],lista[i][2])
			x[1].push(punkt[0])
			y[1].push(punkt[1])
			z[1].push(punkt[2])
		}

		document.getElementById("wynik12").innerHTML = ""
		rysuj_wykres("wynik12",x,y,z)
	}
}

function pobierz_liste()
{
	var krok = parseFloat(document.getElementById("k12").value);
	
	if(isNaN(krok) || krok<=0)
	{
		krok = 0.02
		document.getElementById("k12").value = 0.02
	}

	var wynik = oblicz_zad11()
	
	if(wynik!=null)
	{
		//[u_1,V,a, u_0, t_0, t_1, precyzja]
		var u_1 = wynik[0]
		var V = wynik[1]
		var a = wynik[2]
		var u_0 = wynik[3]
		var t_0 = wynik[4]
		var t_1 = wynik[5]
		var precyzja = wynik[6]
		
		var lista = symulujRuch(u_0, u_1, V, a, t_0, t_1, krok, precyzja)
		
		if(lista!=null)
		{
			return lista
		}
		else
		{
			return null
		}
	}
	else
	{
		return null
	}
}

function pokaz_liste12()
{
	var lista = pobierz_liste()
	
	if(lista!=null)
	{
		var tabela = "<table><tbody><tr><th>Czas[s]</th><th>Przegub 1[stopnie]</th><th>Przegub 2[stopnie]</th><th>Przegub 3[stopnie]</th></tr>"
		for(var i=0;i<lista.length;i++)
		{
			tabela+="<tr>"
			for(var j=0;j<4;j++)
			{
				tabela = tabela + ("<td>" + lista[i][j] +  "</td>")
			}
			tabela+="</tr>"
		}
		tabela += "</tbody></table>"
		
		document.getElementById("wynik12").innerHTML = tabela
	}

}

function symulujRuch(u_0, u_1, V, a, t_0, t_1, krok=0.02, dokladnosc=2)
{
    var t=t_0
    var wynik=[]
	
    while(t<t_1/2)
	{
        var tmp=[]
		tmp.push(round(t,dokladnosc))
        for(var i=0;i<u_0.length;i++)
            tmp.push(round(u_0[i]+(a[i]*t*t)/2,dokladnosc))
		
        wynik.push(tmp)
        t+=krok
	}

    while(t<t_1)
	{
        var tmp = []
		tmp.push(round(t,dokladnosc))
        for(var i=0;i<u_1.length;i++)
            tmp.push(round(u_1[i]-(a[i]/2)*t_1*t_1+(a[i]*t_1*t)-(a[i]/2)*t*t,dokladnosc))
		
        wynik.push(tmp)
        t += krok
	}

    var tmp = []
	tmp.push(round(t_1,dokladnosc))
    for(var i=0;i<u_1.length;i++)
        tmp.push(round(u_1[i]-(a[i]/2)*t_1*t_1+(a[i]*t_1*t_1)-(a[i]/2)*t_1*t_1,dokladnosc))
		
    wynik.push(tmp)

    return wynik
}