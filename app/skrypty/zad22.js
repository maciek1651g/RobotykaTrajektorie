function pokaz_liste22()
{
	var P_t = pobierz_liste22()
	
	if(P_t!=null && P_t.length!=0)
	{
		var wynik = oblicz_zad21()

		if(wynik!=null)
		{
			//[t_b,a,u_1,V,k, t_1,p_0, precyzja]
			var t_b = wynik[0]
			var a = wynik[1]
			var u_1 = wynik[2]
			var V = wynik[3]
			var k = wynik[4]
			var t_1 = wynik[5]
			var p_0 = wynik[6]
			var precyzja = wynik[7]
			
			
			var tmp = punkty_na_katy(P_t, p_0, precyzja)
			
			
			P_t = tmp[1]
			czas = tmp[0]
			
			var tabela = "<table><tbody><tr><th>Czas[s]</th><th>Przegub 1[stopnie]</th><th>Przegub 2[stopnie]</th><th>Przegub 3[stopnie]</th></tr>"
			for(var i=0;i<P_t.length;i++)
			{
				tabela+="<tr><td>"+czas[i]+"</td>"
				for(var j=0;j<3;j++)
				{
					tabela = tabela + ("<td>" + P_t[i][j] +  "</td>")
				}
				tabela+="</tr>"
			}
			tabela += "</tbody></table>"
			
			document.getElementById("wynik22").innerHTML = tabela
		}
	}
}

function pokaz_wykres22()
{
	var x = [[],[]]
	var y = [[],[]]
	var z = [[],[]]
	
	var P_t = pobierz_liste22()
	
	if(P_t!=null)
	{
		
		var wynik = oblicz_zad21()

		if(wynik!=null)
		{
			//[t_b,a,u_1,V,k, t_1,p_0, precyzja]
			var t_b = wynik[0]
			var a = wynik[1]
			var u_1 = wynik[2]
			var V = wynik[3]
			var k = wynik[4]
			var t_1 = wynik[5]
			var p_0 = wynik[6]
			var precyzja = wynik[7]
			
			
			for(var i=0;i<P_t[1].length;i++)
			{
				x[0].push(P_t[1][i][0])
				y[0].push(P_t[1][i][1])
				z[0].push(P_t[1][i][2])
			}
			
			
			var tmp = punkty_na_katy(P_t, p_0, precyzja)
			
			
			P_t = tmp[1]
			
			
			
			for(var i=0;i<P_t.length;i++)
			{
				var punkt = kinematyka_prosta_h20(P_t[i][0],P_t[i][1])
				x[1].push(punkt[0])
				y[1].push(punkt[1])
				z[1].push(punkt[2])
			}
			
			
			document.getElementById("wynik22").innerHTML = ""
			rysuj_wykres("wynik22",x,y,z)
		}

	}
}

function pobierz_liste22()
{
	var krok = parseFloat(document.getElementById("k22").value);
	
	if(isNaN(krok) || krok<0)
	{
		krok = 0.02
		document.getElementById("k22").value = 0.02
	}

	var wynik = oblicz_zad21()

	if(wynik!=null)
	{
		//[t_b,a,u_1,V,k, t_1,p_0, precyzja]
		var t_b = wynik[0]
		var a = wynik[1]
		var u_1 = wynik[2]
		var V = wynik[3]
		var k = wynik[4]
		var t_1 = wynik[5]
		var p_0 = wynik[6]
		var precyzja = wynik[7]
		
		var lista = symulujRuch_lspb(t_b, a, u_1, V, t_1,p_0,k, krok)
		
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

function symulujRuch_lspb(t_b, a, u_1, V, t_1,p_0,k, krok=0.02)
{
	var t = 0
	var U_t=[]
	var czas=[]

	while(t<t_b)
	{
		czas.push(t)
		U_t.push((a*t*t)/2)
		t+=krok
	}

	while(t<t_1-t_b)
	{
		czas.push(t)
		U_t.push(V*t+((u_1-V*t_1)/2))
		t+=krok
	}

	while(t<t_1)
	{
		czas.push(t)
		U_t.push(u_1 - (a/2)*t_1*t_1 + a*t_1*t - (a/2)*t*t)
		t+=krok
	}

	czas.push(t_1)
	U_t.push(u_1 - (a/2)*t_1*t_1 + a*t_1*t_1 - (a/2)*t_1*t_1)
	

	var P_t = []
	
	for(var i=0;i<U_t.length;i++)
	{
		var punkt = []
		for(var j=0;j<p_0.length;j++)
		{
			punkt.push(p_0[j]+(U_t[i]*k[j]))
		}
		P_t.push(punkt)
	}
	
	
	return [czas,P_t]
}

function punkty_na_katy(P_t, p_0, precyzja)
{
	var czas = P_t[0]
	P_t = P_t[1]
	var punkt_poprzeni = p_0
	var tmp=[[],[]]
	for(var i=0;i<P_t.length;i++)
	{
		var rozwiazania = kinematyka_odwrotna_h30(P_t[i])
		if(rozwiazania.length==0)
		{
			for(var j=0;j<P_t[i].length;j++)
			{
				P_t[i][j] = round(P_t[i][j],2)
			}
			rozwiazania = kinematyka_odwrotna_h30(P_t[i])
			
			if(rozwiazania.length==0) continue
		}
		punkt_poprzeni = najlepsze_rozwiazanie(rozwiazania,punkt_poprzeni)
		for(var j=0;j<punkt_poprzeni.length;j++)
			punkt_poprzeni[j]=round(punkt_poprzeni[j],precyzja)
		tmp[0].push(round(czas[i],precyzja))
		tmp[1].push(punkt_poprzeni)
	}
	
	return tmp
}