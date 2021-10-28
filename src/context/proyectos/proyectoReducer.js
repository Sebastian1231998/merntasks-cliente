import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO,
  AGREGAR_PROYECTO,
  ERROR_FORMULARIO_PROYECTO,
  PROYECTO_SELECCIONADO,
  ELIMINAR_PROYECTO
} from "../../types";
// eslint-disable-next-line
export default (state, action) => {
  switch (action.types) {
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true,
      };

    case OBTENER_PROYECTO:
      return {
        ...state,
        proyectos: action.payload,
      };

    case AGREGAR_PROYECTO:
      return {
        ...state,
        proyectos: [...state.proyectos, action.payload],
        errorFormulario: false,
        formulario: false,
      };
    case ERROR_FORMULARIO_PROYECTO:
      return {
        ...state,
        errorFormulario: true,
      };

    case PROYECTO_SELECCIONADO:
      return {
        ...state,
        proyecto: state.proyectos.filter(
          (proyecto) => proyecto._id === action.payload
        ),
      };
    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyectos: state.proyectos.filter(
          (proyecto) => proyecto._id !== action.payload
        ),
        proyecto:null
      };

    default:
      return state;
  }
};
