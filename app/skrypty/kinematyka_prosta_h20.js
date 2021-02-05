function kinematyka_prosta_h20(t_1,t_2)
{
    var t_1 = stopnie_na_radiany(t_1)
    var t_2 = stopnie_na_radiany(t_2)

    var wynik = []
    wynik.push(16*Math.cos(t_1)+220*Math.cos(t_1)*Math.cos(t_2))
    wynik.push(16*Math.sin(t_1)+220*Math.sin(t_1)*Math.cos(t_2))
    wynik.push(220*Math.sin(t_2)+350)

    return wynik
}