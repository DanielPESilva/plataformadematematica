package ClassesEMetodos;
public class Usuario {
    private String id;
    private String nome;
    private String telefone;
    private String email;
    private int matricula;
    private String cpf;

public Usuario(String id, String nome,String telefone, String email, int matricula, String cpf){
    this.id=id;
    this.nome=nome;
    this.telefone=telefone;
    this.email=email;
    this.matricula=matricula;
    this.cpf=cpf;
}

public String getId() {return id;}
public void setId(String id) {this.id = id;}

public String getNome() {return nome;}
public void setNome(String nome) {this.nome = nome;}

public String getTelefone() {return telefone;}
public void setTelefone(String telefone) {this.telefone = telefone;}

public String getEmail() {return email;}
public void setEmail(String email) {this.email = email;}

public int getMatricula() {return matricula;}
public void setMatricula(int matricula) {this.matricula = matricula;}

public String getCpf() {return cpf;}
public void setCpf(String cpf) {this.cpf = cpf;}
}

