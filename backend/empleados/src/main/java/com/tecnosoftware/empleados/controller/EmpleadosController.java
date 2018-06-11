package com.tecnosoftware.empleados.controller;

import com.tecnosoftware.empleados.exception.EmpleadoNotFoundException;
import com.tecnosoftware.empleados.model.Empleado;
import com.tecnosoftware.empleados.service.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/empleado")
@CrossOrigin
public class EmpleadosController {

    // Injectar service (bean) y utilizarlo para el abm de empleados

    @Autowired
    private EmpleadoService empleadoService;

    @RequestMapping(value = "/crear", method = RequestMethod.POST)
    public Empleado crearEmpleado(@Valid @RequestBody Empleado empleado) {
        return empleadoService.crearEmpleado(empleado);
    }

    @RequestMapping(value = "/editar/", method = RequestMethod.PUT)
    public ResponseEntity<Empleado> editarTodo(@Valid @RequestBody Empleado empleadomodificado) throws EmpleadoNotFoundException {
        if(empleadoService.editarTodo(empleadomodificado.getId(), empleadomodificado)){
            return ResponseEntity.ok(empleadomodificado);
        }
        /*
        if (empleado == null) {

        }*/
        throw new EmpleadoNotFoundException("No se encontro el empleado con el id: " + empleadomodificado.getId());


    }


    @RequestMapping(value = "/eliminar/{empleadoId}", method = RequestMethod.DELETE)
    public ResponseEntity<Empleado> eliminarEmpleado(@PathVariable Integer empleadoId) throws EmpleadoNotFoundException {
        Empleado empleado=empleadoService.buscarEmpleado(empleadoId);

        if (empleado == null) {
            throw new EmpleadoNotFoundException("No se encontro el empleado con el id: " + empleadoId);
        }
        empleadoService.eliminarEmpleado(empleadoId);
        return ResponseEntity.ok(empleado);
    }

    //@CrossOrigin(origins = "http://localhost:8080/empleado/list")
    @RequestMapping("/list")
    @CrossOrigin
    public List<Empleado> list() {
        return empleadoService.list();
    }

    @RequestMapping("/buscar/edad/{edad}")
    public List<Empleado> list(@PathVariable int edad) {
        return empleadoService.buscarPorEdad(edad);
    }

    @RequestMapping(value = "/buscar/{empleadoId}")
    public ResponseEntity<Empleado> buscarEmpleado(@PathVariable Integer empleadoId) throws EmpleadoNotFoundException {
        Empleado empleado = empleadoService.buscarEmpleado(empleadoId);
        if (empleado == null) {
            throw new EmpleadoNotFoundException("No se encontro el empleado con el id: " + empleadoId);
        }
        return ResponseEntity.ok(empleado);
    }


    @ExceptionHandler(EmpleadoNotFoundException.class)
    public Map<String, String> onException(EmpleadoNotFoundException e) {
        return Collections.singletonMap("mensaje", e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public Map<String, Map<String, String>> validationError(MethodArgumentNotValidException ex) {
        Map<String, String> map = new HashMap<>();
        Map<String, Map<String, String>> errors = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            map.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        errors.put("errores", map);
        return errors;
    }
}
