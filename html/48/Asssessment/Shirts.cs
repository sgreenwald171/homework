namespace Asssessment {
    internal class Shirts {

        List<string> colors = new List<string>() {
            "red",
            "green",
            "blue"
        };
        List<string> patterns = new List<string>() {
            "striped",
            "checked",
            "plain"

        };
        public void PrintShirts() {
            foreach (string color in colors) {
                foreach (string pattern in patterns) {
                    Console.WriteLine($"{color}: {pattern}");
                }
            }
        }

    }
}
