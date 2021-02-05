function kinematyka_prosta_h30(t_1,t_2,t_3)
{
    var t_1 = stopnie_na_radiany(t_1)
    var t_2 = stopnie_na_radiany(t_2)
    var t_3 = stopnie_na_radiany(t_3)
    var wynik = []
    wynik.push(16*Math.cos(t_1)+220*Math.cos(t_1)*Math.cos(t_2)+220*Math.cos(t_1)*Math.cos(t_2)*Math.cos(t_3)-220*Math.cos(t_1)*Math.sin(t_2)*Math.sin(t_3))
    wynik.push(220*Math.cos(t_2)*Math.sin(t_1)+220*Math.cos(t_2)*Math.cos(t_3)*Math.sin(t_1)+16*Math.sin(t_1)-220*Math.sin(t_1)*Math.sin(t_2)*Math.sin(t_3))
    wynik.push(220*Math.cos(t_3)*Math.sin(t_2)+220*Math.sin(t_2)+220*Math.cos(t_2)*Math.sin(t_3)+350)

    return wynik
}