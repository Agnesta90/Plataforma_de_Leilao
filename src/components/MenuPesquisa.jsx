import { Trash2 } from "lucide-react";
import { Fragment } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";

export default function Menu({ apagar, buscar }) {
  const listaEstado = [
    {
      nomeRegiao: "Norte",
      estados: ["AC", "AP", "AM", "PA", "RO", "RR", "TO"],
    },
    {
      nomeRegiao: "Nordeste",
      estados: ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"],
    },
    { nomeRegiao: "Centro-Oeste", estados: ["DF", "GO", "MS", "MT"] },
    { nomeRegiao: "Sudeste", estados: ["ES", "MG", "RJ", "SP"] },
    { nomeRegiao: "Sul", estados: ["PR", "RS", "SC"] },
  ];

  const { register, control, reset } = useForm({ mode: "onChange" });
  const dados = useWatch({control})
  const itens = JSON.stringify(dados)

  useEffect(() => {
    if (!dados) return;
    buscar(dados);
  }, [itens, buscar] );

  const handleLimpar = () => {
    reset()
    apagar()
  }
  return (
    <>
      <form>
        <div className="border-b flex items-center justify-around">
          <h1 className="text-[20px] laptop:text-2xl font-bold mt-2.5 mb-2.5 text-center">
            Filtrar
          </h1>
          <button
            className="cursor-pointer"
            type="reset"
            onClick={handleLimpar}
          >
            <Trash2 />
          </button>
        </div>
        <article className="mt-1 mb-1 flex flex-col ">
          <h2 className="text-[18px] font-bold">Tempo</h2>
          <label>
            <input
              type="radio"
              value="horas"
              name="hora"
              {...register("time")}
            />{" "}
            menos de um dia
          </label>
          <label>
            <input type="radio" value="dia" name="hora" {...register("time")} />{" "}
            mais de um dia
          </label>
        </article>
        <article className="mt-1 mb-1 w-full">
          <h2 className="text-[18px] font-bold mt-1.5 w-full ">Preço</h2>
          <div className="flex w-full items-center gap-1 mb-1">
            <input
              type="text"
              placeholder="min"
              className="py-1 px-1.5 border rounded-[5px] w-full"
              {...register("valorMin")}
            />
            <p>até</p>
            <input
              type="text"
              placeholder="max"
              className="py-1 px-1.5 border rounded-[5px] w-full"
              {...register("valorMax")}
            />
          </div>
        </article>
        <article className="mt-1 mb-1 ">
          <h2 className="text-[18px] font-bold mt-1.5">Região</h2>
          {listaEstado.map((item, index) => {
            return (
              <Fragment key={index}>
                <p>{item.nomeRegiao}</p>
                <div className="flex flex-col flex-wrap h-25 ">
                  {item.estados.map((estado) => {
                    return (
                      <label key={estado}>
                        <input
                          type="radio"
                          name="estado"
                          value={estado}
                          {...register("estado")}
                        />{" "}
                        {estado}
                      </label>
                    );
                  })}
                </div>
              </Fragment>
            );
          })}
        </article>
      </form>
    </>
  );
}


