    package Model;

    import jakarta.persistence.*;
    import lombok.*;


    @Getter
    @Setter
    @Table(name = "composer")
    @Entity
    @AllArgsConstructor
    @Builder
    @NoArgsConstructor
    public class Composer {

        @Id
        @Column(name = "composer_id")
        private Long ComposerID;
        @Column(name = "first_name") // Use lower case with underscores for column names
        private String FirstName;
        @Column(name = "last_name")
        private String LastName;
        @Column(name = "email")
        private String Email;
        @Column(name = "phone")
        private String Phone;
        @Column(name = "genre")
        private String Genre;

        @Override
        public String toString() {
            return "Composer{" +
                    "ComposerID=" + ComposerID +
                    ", FirstName='" + FirstName + '\'' +
                    ", LastName='" + LastName + '\'' +
                    ", Email='" + Email + '\'' +
                    ", Phone='" + Phone + '\'' +
                    ", Genre='" + Genre + '\'' +
                    '}';
        }
    }
