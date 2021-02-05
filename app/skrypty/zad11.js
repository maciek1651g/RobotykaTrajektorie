function wyswietl_zad11()
{
	var wynik = oblicz_zad11()
	
	
	if(wynik!=null && wynik[0].length!=0 && wynik[1].length!=0 && wynik[2].length!=0)
	{
		for(var i=0;i<wynik[0].length;i++)
		{
			wynik[0][i] = round(wynik[0][i], wynik[wynik.length-1])
			wynik[1][i] = round(wynik[1][i], wynik[wynik.length-1])
			wynik[2][i] = round(wynik[2][i], wynik[wynik.length-1])
		}
		
		var tabela = "<table><tbody><tr><th>Przegub</th><th>Położenie[stopnie]</th><th>Prędkość[stopnie/s]</th><th>Przyśpieszenie[stopnie/s<sup>2</sup>]</th></tr>"
		for(var i=0;i<3;i++)
		{
			tabela+=("<tr><td>"+(i+1)+"</td>")
			for(var j=0;j<3;j++)
			{
				tabela = tabela + ("<td>" + wynik[j][i] +  "</td>")
			}
			tabela+="</tr>"
		}
		tabela += "</tbody></table>"
		
		document.getElementById("wynik11tabela").innerHTML = tabela
	}
}


function oblicz_zad11()
{
	var t_0=0
	var t_1=parseFloat(document.getElementById("t11").value);
	
	if(isNaN(t_1) || t_1<=0)
	{
		//console.error("Błędne dane.")
		document.getElementById("wynik11tabela").innerHTML = "<p>Czas musi być dodatni.</p>"
		return null
	}
	
	var precyzja = parseInt(document.getElementById("p11").value)
	
	if(isNaN(precyzja) || precyzja<0)
	{
		precyzja=2
		document.getElementById("p11").value = 2
	}
	
	
	var u_0 = [parseFloat(document.getElementById("pp1x").value),
			parseFloat(document.getElementById("pp1y").value),
			parseFloat(document.getElementById("pp1z").value)]
	
	for(var i=0;i<u_0.length;i++)
	{
		if(isNaN(u_0[i]))
		{
			//console.error("Błędne dane.")
			document.getElementById("wynik11tabela").innerHTML = "<p>Musisz podać położenie początkowe.</p>"
			return null
		}
	}
	
	
	
	var p_1 = [parseFloat(document.getElementById("pk1x").value),
			parseFloat(document.getElementById("pk1y").value),
			parseFloat(document.getElementById("pk1z").value)]
	
	for(var i=0;i<p_1.length;i++)
	{
		if(isNaN(p_1[i]))
		{
			//console.error("Błędne dane.")
			document.getElementById("wynik11tabela").innerHTML = "<p>Musisz podać położenie końcowe.</p>"
			return null
		}
	}
	
	var u_1 = kinematyka_odwrotna_h30(p_1)
	
	if(u_1.length==0)
	{
		document.getElementById("wynik11tabela").innerHTML = "<p>Brak rozwiązań.</p>"
		return null
	}
	
	u_1 = najlepsze_rozwiazanie(u_1, u_0)

	var V=[]
	var a=[]
	
	for(var i=0;i<u_0.length;i++)
	{
		V.push(2*(u_1[i]-u_0[i])/t_1)
		a.push(V[i]/((1/2)*t_1))
	}

	
	var wynik = [u_1,V,a, u_0, t_0, t_1, precyzja]
	
	return wynik
}