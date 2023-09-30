import Metaphor from "metaphor-node";
import { METAPHOR_API_KEY } from "@/utils/env";

const metaphor = new Metaphor(METAPHOR_API_KEY);

export default metaphor