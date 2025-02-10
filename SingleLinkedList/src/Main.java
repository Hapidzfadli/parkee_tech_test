public class Main {
    public static void main(String[] args) {
        // Membuat objek SingleLinkedList
        SingleLinkedList list = new SingleLinkedList();

        // Menambahkan elemen ke dalam linked list
        list.insertAtEnd(10);
        list.insertAtEnd(20);
        list.insertAtEnd(30);
        list.display(); // Output: 10 -> 20 -> 30 -> null

        // Menambahkan elemen di awal
        list.insertAtBeginning(5);
        list.display(); // Output: 5 -> 10 -> 20 -> 30 -> null

        // Menghapus elemen dengan nilai tertentu
        list.deleteByValue(20);
        list.display(); // Output: 5 -> 10 -> 30 -> null
    }
}
